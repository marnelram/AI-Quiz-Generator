"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QuizCreationSchema,
  quizCreationSchema,
} from "@/app/schemas/form/quiz";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "../ui/separator";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**
 * - Mutation Documentation
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/mutations
 *
 * @returns
 */
export default function CreateQuizCard() {
  const router = useRouter();

  // initialize the react query mutation hook
  const { mutate: createQuiz, isPending } = useMutation({
    mutationFn: async (input: QuizCreationSchema) => {
      const response = await fetch("/api/create_quiz", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      const data = await response.json();
      return data;
    },
  });

  const form = useForm<QuizCreationSchema>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 3,
      topic: "",
      type: "fill_in_the_blank",
    },
  });

  async function onSubmit(input: QuizCreationSchema) {
    createQuiz(input, {
      onSuccess: (quizId) => {
        console.log("quiz creation successful");
        console.log("quizId: ", quizId);

        if (form.getValues("type") == "fill_in_the_blank") {
          router.push(`/play/fill_in_the_blank/${quizId}`);
        } else {
          router.push(`/play/multiple_choice/${quizId}`);
        }
      },
    });
  }

  form.watch();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
        <CardDescription>Choose a topic</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a topic..." {...field} />
                  </FormControl>
                  <FormDescription>Please provide a topic</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      max={10}
                      onChange={(e) =>
                        form.setValue("amount", parseInt(e.target.value))
                      }
                      placeholder="Enter an amount"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => form.setValue("type", "multiple_choice")}
                variant={
                  form.getValues("type") === "multiple_choice"
                    ? "default"
                    : "secondary"
                }
                className="w-1/2 rounded-none rounded-l-lg"
              >
                <CopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
              </Button>
              <Separator orientation="vertical" />
              <Button
                type="button"
                onClick={() => form.setValue("type", "fill_in_the_blank")}
                variant={
                  form.getValues("type") === "fill_in_the_blank"
                    ? "default"
                    : "secondary"
                }
                className="w-1/2 rounded-none rounded-r-lg"
              >
                <BookOpen className="w-4 h-4 mr-2" /> Open Ended
              </Button>
            </div>
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
