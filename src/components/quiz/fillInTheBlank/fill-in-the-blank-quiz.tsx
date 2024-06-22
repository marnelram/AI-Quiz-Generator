"use client";
import { Question, Quiz } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import QuestionCard from "../question-card";
import { useToast } from "../../ui/use-toast";
import CompletedCard from "../completed-card";
import { Input } from "@/components/ui/input";
import QuizHeader from "../quiz-header";

export interface fillInTheBlankQuizProps {
  quiz: Quiz & { questions: Question[] };
}

const generateResponseSchema = (numResponses: number) => {
  console.log("num responses: ", numResponses);
  const responseSchema = z.object({});
  for (let i = 1; i <= numResponses; i++) {
    responseSchema.extend({
      [`response-${i}`]: z.string(),
    });
  }

  console.log("responseSchema shape: ", responseSchema.shape);
  return responseSchema;
};

export default function FillInTheBlankQuiz({ quiz }: fillInTheBlankQuizProps) {
  const { questions, topic } = quiz;

  // get the current question
  const [questionNumber, setQuestionNumber] = useState(0);
  const currentQuestion = useMemo(
    () => quiz.questions[questionNumber],
    [quiz.questions, questionNumber]
  );

  // set the blank answer array
  const answerParts = useMemo(
    () =>
      currentQuestion.blankedAnswer
        ? currentQuestion.blankedAnswer?.split("<blank>")
        : [currentQuestion.answer],
    [currentQuestion]
  );
  console.log("answerParts: ", answerParts);

  const formSchema = useMemo(
    () => generateResponseSchema(answerParts.length - 1),
    [answerParts]
  );

  //initialize the questionForm
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  console.log("form schema: ", formSchema.shape);

  // set the correct counter
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [numberWrong, setNumberWrong] = useState(0);

  // set the stop timer function
  const [time, setTime] = useState(0);
  const stopTimer = (time: number) => {
    console.log(`quiz took: ${time} seconds`);
    setTime(time);
  };
  const [isEnded, setIsEnded] = useState(false);

  // create the toast
  const { toast } = useToast();

  function onSubmit(form: any) {
    setIsEnded(true);
    form.console.log("form: ", form);
    form.parts;
  }

  if (questionNumber + 1 > questions.length) {
    console.log("current question: ", questionNumber);
    console.log("quiz lenght: ", questions.length);
    return (
      <div className="flex w-full h-full flex-col justify-center items-center">
        {/* Completed Card */}
        <CompletedCard
          numberCorrect={numberCorrect}
          numberWrong={numberWrong}
          time={time}
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col h-full max-w-3xl gap-4">
      <QuizHeader
        topic={topic}
        isEnded={isEnded}
        stopTimer={stopTimer}
        numberCorrect={numberCorrect}
        numberWrong={numberWrong}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <FormLabel>
            <QuestionCard
              questionNumber={questionNumber}
              quizLength={questions.length}
              question={currentQuestion.question}
            />
          </FormLabel>

          {/* render the text and an input for each part */}
          {answerParts.flatMap((part, index) => {
            if (index < answerParts.length - 1) {
              return [
                <span key={`text-${index}`}>{part}</span>,
                <FormField
                  key={`response-${index}`}
                  control={form.control}
                  name={`response-${index}`}
                  render={({ field }) => (
                    <FormItem>
                      {/* fill in the blank response */}
                      <FormControl>
                        <FormItem>
                          <FormControl>
                            <Input key={`response-${index}`} className="w-36" />
                          </FormControl>
                        </FormItem>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />,
              ];
              // only render the text for the last input
            } else if (index === answerParts.length - 1) {
              if (answerParts[index] !== "")
                return <span key={`text-${index}`}>{part}</span>;
            }
          })}

          {/* Submit Button */}
          <Button type="submit" className="self-center w-36">
            Next <ChevronRight className="ml-4 w-4 h-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
