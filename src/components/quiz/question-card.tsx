import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export interface questionCardProps {
  questionNumber: number;
  question: string;
  quizLength: number;
}

export default function QuestionCard({
  questionNumber,
  question,
  quizLength,
}: questionCardProps) {
  return (
    <Card className="w-full bg-secondary">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
          <div>{questionNumber + 1}</div>
          <div className="text-base text-slate-400">{quizLength}</div>
        </CardTitle>
        <CardDescription className="flex-grow text-primary text-lg">
          {question}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
