import { auth } from "@/auth";
import SigninButton from "@/components/signin-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to AI quiz generator!</CardTitle>
          <CardDescription>
            this is a quiz app that allows you to create and share ai generated
            quizzes with your friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SigninButton>Sign in with Google</SigninButton>
        </CardContent>
      </Card>
    </div>
  );
}
