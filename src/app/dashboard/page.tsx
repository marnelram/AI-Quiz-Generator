import { auth } from "@/auth";
import HistoryCard from "@/components/dashboard/history-card";
import HotTopicCard from "@/components/dashboard/hot-topic-card";
import QuizMeCard from "@/components/dashboard/quiz-me-card";
import RecentActivities from "@/components/dashboard/recent-activities";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard | AI quiz generator",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <main className="p-8 mx-auto max-w-7xl w-full">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-light">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-col-7">
        {/* <HotTopicCard /> */}
        <RecentActivities />
      </div>
    </main>
  );
}
