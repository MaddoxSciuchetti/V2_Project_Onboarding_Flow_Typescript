import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/trycatch';
import { Dispatch, SetStateAction } from 'react';

type RadioSelectProps<T> = {
  selectedOption: T | null;
  setSelectedOption: Dispatch<SetStateAction<T | null>>;
  options: { id: string; value: T; title: string; description: string }[];
};

const RadioSelect = <T,>({
  setSelectedOption,
  selectedOption,
  options,
}: RadioSelectProps<T>) => {
  return (
    <RadioGroup
      className="flex flex-col gap-3"
      onValueChange={(value) => setSelectedOption(value as T)}
      value={selectedOption as string}
    >
      {options.map((option) => (
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
            <RadioGroupItem value={option.value as string} id={option.id} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
};

export default RadioSelect;
