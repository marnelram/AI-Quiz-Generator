import { auth } from "@/auth";
import CreateQuizCard from "@/components/quiz/create-quiz-card";

import { redirect } from "next/navigation";

export const metadata = {
  title: "Quiz | AI quiz generator",
};

export default async function QuizPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="h-full flex flex-col justify-center">
      <CreateQuizCard />
    </div>
  );
}
