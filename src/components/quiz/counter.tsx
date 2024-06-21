import { CheckCircle2, XCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

export interface counterCardProps {
  numberCorrect: number;
  numberWrong: number;
}

export default function CounterCard({
  numberCorrect,
  numberWrong,
}: counterCardProps) {
  return (
    <Card className="flex w-48 gap-4 items-center justify-center p-2">
      <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
        <CheckCircle2 size={30} />
        <p className="text-2xl">{numberCorrect}</p>
      </div>

      <Separator className="h-10" orientation="vertical" />

      <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
        <p className="text-2xl">{numberWrong}</p>
        <XCircle size={30} />
      </div>
    </Card>
  );
}
