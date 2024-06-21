import { FormControl, FormItem } from "../../ui/form";
import { ToggleGroupItem } from "../../ui/toggle-group";

export interface choiceProps {
  choice: string;
  choiceNumber: number;
}

export default function ChoiceCard({ choice, choiceNumber }: choiceProps) {
  return (
    <FormItem className="w-full h-full">
      <FormControl>
        <ToggleGroupItem
          className="flex justify-start p-6 md:p-8 flex-grow border-2 rounded-lg items-center w-full fill-primary"
          value={choice}
        >
          <div className="flex w-full text-start justify-start items-center gap-4">
            <div className="flex items-center justify-center border rounded-lg w-8 h-8 bg-primary text-secondary">
              {choiceNumber}
            </div>
            <p>{choice}</p>
          </div>
        </ToggleGroupItem>
      </FormControl>
    </FormItem>
  );
}
