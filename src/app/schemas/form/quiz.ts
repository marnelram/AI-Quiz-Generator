import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long" })
    .max(60),
  type: z.enum(["multiple_choice", "fill_in_the_blank"]),
  amount: z.number().min(1).max(10),
});

export type QuizCreationSchema = z.infer<typeof quizCreationSchema>;
