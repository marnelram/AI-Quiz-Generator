"use client";

import { BrainCircuit } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRouter } from "next/navigation";
import CustomWordCloud from "../custom-word-cloud";

export default function HotTopicCard() {
  const router = useRouter();
  return (
    <Card className="col-span-4" onClick={() => router.push("/quiz")}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it!
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-2">
        <CustomWordCloud />
      </CardContent>
    </Card>
  );
}
