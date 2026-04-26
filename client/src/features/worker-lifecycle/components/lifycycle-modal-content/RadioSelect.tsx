import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AddWorker } from '@/features/worker-lifecycle/schemas/zod.schemas';
import { cn } from '@/lib/trycatch';
import { Dispatch, SetStateAction } from 'react';
import { OPTIONS } from '../../consts/radio.consts';

type RadioSelectProps = {
  selectedOption: AddWorker['type'] | null;
  setSelectedOption: Dispatch<SetStateAction<AddWorker['type'] | null>>;
};

const RadioSelect = ({
  setSelectedOption,
  selectedOption,
}: RadioSelectProps) => {
  return (
    <RadioGroup
      className="flex flex-col gap-3"
      onValueChange={(value) => setSelectedOption(value as AddWorker['type'])}
      value={selectedOption}
    >
      {OPTIONS.map((option) => (
        <FieldLabel
          key={option.id}
          htmlFor={option.id}
          className={cn(
            'cursor-pointer rounded-xl border border-border p-4 transition-colors hover:bg-accent hover:text-accent-foreground',
            selectedOption === option.value &&
              'bg-accent text-accent-foreground'
          )}
        >
          <Field
            orientation="horizontal"
            className="items-center justify-between gap-3"
          >
            <FieldContent className="text-left">
              <FieldTitle>{option.title}</FieldTitle>
              <FieldDescription>{option.description}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={option.value} id={option.id} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
};

export default RadioSelect;
