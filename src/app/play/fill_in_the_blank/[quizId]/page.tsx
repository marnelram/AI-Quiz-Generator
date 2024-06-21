import { auth } from "@/auth";
import FillInTheBlankQuiz from "@/components/quiz/fillInTheBlank/fill-in-the-blank-quiz";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export interface openEndedPageProps {
  params: {
    quizId: string;
  };
}

export default async function OpenEndedPage({ params }: openEndedPageProps) {
  // Auth the user
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }

  // get the quiz ID from the URL param
  const quizId = decodeURIComponent(params.quizId);

  // fetch the quiz from the database
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      questions: true,
    },
  });

  if (!quiz || quiz.quizType !== "fill_in_the_blank") {
    return redirect("/create_quiz");
  }

  return <FillInTheBlankQuiz quiz={quiz} />;
}
