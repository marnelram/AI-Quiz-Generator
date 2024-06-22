"use client";
import { Question, Quiz } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { ToggleGroup } from "../../ui/toggle-group";
import { useState } from "react";
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
import ChoiceCard from "./choice-card";
import QuestionCard from "../question-card";
import { useToast } from "../../ui/use-toast";
import CompletedCard from "../completed-card";
import QuizHeader from "../quiz-header";

export interface multipleChoiceQuizProps {
  quiz: Quiz & { questions: Question[] };
}

const formSchema = z.object({
  response: z.string(),
});

export default function MultipleChoiceQuiz({ quiz }: multipleChoiceQuizProps) {
  // deconstruct the quiz
  const { topic, questions } = quiz;

  // set the current question state
  const [questionNumber, setQuestionNumber] = useState(0);
  const currentQuestion = quiz.questions[questionNumber];

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

  //initialize the questionForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // create the toast
  const { toast } = useToast();

  function onSubmit(form: z.infer<typeof formSchema>) {
    if (form.response === currentQuestion.answer) {
      setNumberCorrect(numberCorrect + 1);
      toast({
        variant: "success",
        title: "Correct!",
        description: "Keep it Going!",
      });
    } else if (form.response === "") {
    } else {
      setNumberWrong((number) => number + 1);
      toast({
        variant: "destructive",
        title: "Wrong!",
        description: "LOOSER",
      });
    }
    if (questionNumber < questions.length) {
      setQuestionNumber((number) => number + 1);
      setIsEnded(true);
    }

    console.log(form.response);
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
          className="flex flex-col gap-4 h-full"
        >
          {/* Question */}
          <FormLabel>
            <QuestionCard
              questionNumber={questionNumber}
              quizLength={questions.length}
              question={currentQuestion.question}
            />
          </FormLabel>
          <FormField
            control={form.control}
            name="response"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4 w-full">
                {/* Multiple Choice Responses */}
                <FormControl>
                  <ToggleGroup
                    className="flex flex-col items-center justify-center w-full mt-4 gap-2"
                    type="single"
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <ChoiceCard
                      choice={currentQuestion.options[0]}
                      choiceNumber={1}
                    />
                    <ChoiceCard
                      choice={currentQuestion.options[1]}
                      choiceNumber={2}
                    />
                    <ChoiceCard
                      choice={currentQuestion.options[2]}
                      choiceNumber={3}
                    />
                    <ChoiceCard
                      choice={currentQuestion.options[3]}
                      choiceNumber={4}
                    />
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="self-center w-36">
            Next <ChevronRight className="ml-4 w-4 h-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
