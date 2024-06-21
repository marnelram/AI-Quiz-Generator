import { quizCreationSchema } from "@/app/schemas/form/quiz";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Question } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

/**
 *
 * @see https://community.openai.com/t/function-call-arrays-as-parameters/268008
 * @see
 *
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    // authenticate the user
    const session = await auth();
    console.log("session: ", session);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to create a quiz" },
        { status: 401 }
      );
    }

    // parse the body
    const body = await req.json();
    const parseResult = quizCreationSchema.safeParse(body);
    if (!parseResult.success) {
      console.log(parseResult.error);
      return Response.json({ error: parseResult.error }, { status: 400 });
    }

    // deconstruct the quiz form
    const { amount, topic, type } = parseResult.data;

    //initialize the openai object
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    //Initialize the prompts
    const SYSTEMPROMPT = `You are a helpful AI that is able to generate a pair of questions and answers given a topic and type of question.`;

    const USERPROMPT = `Generate a list of ${amount} question-answer pairs as ${type} questions about ${topic}`;

    // Generate the response from OpenAI
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEMPROMPT },
        { role: "user", content: USERPROMPT },
      ],
      model: "gpt-3.5-turbo",

      tools: [
        // define the multiple choice quiz tool
        {
          type: "function",
          function: {
            name: "createMultipleChoiceQuiz",
            description: `Create a multiple choice quiz representing a list of ${amount} multiple choice questions and answers using the ${topic} in JSON format.`,
            parameters: {
              type: "object",
              properties: {
                quiz: {
                  type: "array",
                  description:
                    "a quiz representing a list of question-answer pairs",
                  items: {
                    type: "object",
                    properties: {
                      question: {
                        type: "string",
                        description: `a question with the topic ${topic}`,
                      },
                      answer: {
                        type: "string",
                        description: `the right answer to the multiple choice question`,
                      },
                      options: {
                        type: "array",
                        description:
                          "an array of wrong options for the multiple choice questions",
                        items: {
                          option1: {
                            type: "string",
                            description: `a wrong answer to the multiple choice question`,
                          },
                          option2: {
                            type: "string",
                            description: `a wrong answer to the multiple choice question`,
                          },
                          option3: {
                            type: "string",
                            description: `a wrong answer to the multiple choice question`,
                          },
                        },
                      },
                    },
                  },
                },
              },
              required: ["quiz"],
            },
          },
        },
        // define the open ended quiz tool
        {
          type: "function",
          function: {
            name: "createFillInTheBlankQuiz",
            description: `Create a quiz with fill in the blank questions represented as a list of ${amount} questions, their answers, and a structured representation of the answer with blanks using the ${topic} in JSON format.`,
            parameters: {
              type: "object",
              properties: {
                quiz: {
                  type: "array",
                  description:
                    "a fill in the blank quiz representing a list of questions, their answers, and a blanked out answer",
                  items: {
                    type: "object",
                    properties: {
                      question: {
                        type: "string",
                        description: `a question with the topic ${topic}`,
                      },
                      answer: {
                        type: "string",
                        description: `the answer to the question`,
                      },
                      blankedAnswer: {
                        type: "string",
                        description: `the answer with the most important information to answer the question blanked out. Replace the word with a "<blank>". Blank out the answers in line with the goal to learn ${topic}. Only blank out a maximum of 2 words.`,
                      },
                    },
                  },
                },
              },
              required: ["quiz"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    // parse the JSON object
    if (!response.choices[0].message.tool_calls?.[0].function.arguments) {
      return Response.json("failed to parse the LLM response"), { status: 500 };
    }
    const parsedResponse = JSON.parse(
      response.choices[0].message.tool_calls?.[0].function.arguments
    );

    console.log("parsed response: ", parsedResponse);

    // extract the questions from the JSON object
    const questions: Question[] = parsedResponse.quiz;

    // add the question type to each question, and the question answer to the options list
    questions.forEach((question) => (question.questionType = type));
    if (type === "multiple_choice") {
      questions.forEach((question) => question.options.push(question.answer));
    }
    console.log("questions: ", questions);

    const quiz = await prisma.$transaction(async (tx) => {
      const quiz = await tx.quiz.create({
        data: {
          userId: session.user.id,
          topic,
          quizType: type,
        },
      });

      questions.forEach((question) => (question.quizId = quiz.id));

      await prisma.question.createMany({
        data: questions,
      });
      return quiz;
    });

    return Response.json(quiz.id);

    // return Response.json(questions);
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
