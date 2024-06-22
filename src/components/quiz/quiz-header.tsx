import { TimerIcon } from "lucide-react";
import Timer from "../timer";
import CounterCard from "./counter";

export interface quizHeaderProps {
  topic: string;
  isEnded: boolean;
  stopTimer: (time: number) => void;
  numberCorrect: number;
  numberWrong: number;
}

export default function QuizHeader({
  topic,
  isEnded,
  stopTimer,
  numberCorrect,
  numberWrong,
}: quizHeaderProps) {
  return (
    <div className="flex w-full flex-col gap-6 md:gap-8 items-center justify-between">
      {/* topic */}
      <div className="flex w-full flex-col md:flex-row items-center justify-center gap-2">
        <p className="md:p-10 p-6 sm:p-8 w-full text-center text-white text-2xl font-bold rounded-lg bg-slate-800">
          {topic}
        </p>
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="flex justify-self-center text-slate-400">
          <TimerIcon className="mr-2" />
          <Timer isEnded={isEnded} stopTimer={stopTimer} />
        </div>
        <CounterCard numberCorrect={numberCorrect} numberWrong={numberWrong} />
      </div>
    </div>
  );
}
