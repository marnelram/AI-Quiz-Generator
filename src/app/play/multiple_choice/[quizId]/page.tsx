import { auth } from "@/auth";
import MultipleChoiceQuiz from "@/components/quiz/multipleChoice/multiple-choice-quiz";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

function shuffleQuestions(questions: Array<string>) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}

export interface multipleChoicePageProps {
  params: {
    quizId: string;
  };
}

export default async function MultipleChoicePage({
  params,
}: multipleChoicePageProps) {
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

  if (!quiz || quiz.quizType !== "multiple_choice") {
    return redirect("/create_quiz");
  }

  // shuffle the questions
  quiz.questions.forEach((question) => {
    shuffleQuestions(question.options);
  });

  return <MultipleChoiceQuiz quiz={quiz} />;
}
