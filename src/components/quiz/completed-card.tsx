import { BarChart3, PartyPopper } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CounterCard from "./counter";
import { Button } from "../ui/button";

export interface completedCardProps {
  time: number;
  numberCorrect: number;
  numberWrong: number;
}

export default function CompletedCard({
  time,
  numberCorrect,
  numberWrong,
}: completedCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center gap-8">
      <CardHeader>
        <CardTitle className="text-2xl">Congratulations!</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-full items-center justify-center flex flex-col gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <PartyPopper className="text-yellow-500 dark:text-yellow-200" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              You have completed the quiz!
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-col items-center justify-center">
          <p>Time</p>
          <strong>
            {Math.floor(time / 60)}min :{" "}
            {(time % 60).toString().padStart(2, "0")}sec
          </strong>
        </div>
        <div className="flex gap-2 flex-col items-center justify-center">
          <p>Score</p>
          <CounterCard
            numberCorrect={numberCorrect}
            numberWrong={numberWrong}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="flex gap-2" size="lg">
          View Statistics
          <BarChart3 />
        </Button>
      </CardFooter>
    </Card>
  );
}
