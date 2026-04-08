import { cn } from '@/lib/trycatch';
import { LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type State = 'Default' | 'Open';
const DropdownStates: Record<State, string> = {
  Default: 'bg-transparent',
  Open: 'bg-transparent border-1 border-border-default',
};
type Size = 'sm' | 'lg';

const sizes: Record<Size, string> = {
  sm: 'h-8',
  lg: 'h-9 w-60',
};

type SelectDropdownProps<T extends string> = {
  state: State;
  size: Size;
  icon: LucideIcon;
  label?: string;
  options: T[];
  setValue: (value: T) => void;
  value: string;
};

export function SelectDropdown<T extends string>({
  state,
  size,
  icon: Icon,
  label,
  options,
  setValue,
  value,
}: SelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('click', (e) => {
      const handleClickOutside = () => {
        if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
      };
      return document.removeEventListener('click', handleClickOutside);
    });
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-lg border border-interactive-disabled-text px-3 flex items-center w-full',
        DropdownStates[state],
        sizes[size]
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <p className="text-body-sm grow text-text-disabled">{value ?? label}</p>
      <Icon
        className={cn(
          `w-6 h-6 text-text-disabled transition-transform duration-200`,
          isOpen ? 'rotate-90' : 'rotate-0'
        )}
      />
      {isOpen && (
        <div className="absolute p-3 bg-surface-page top-full rounded-2xl border  left-0 w-full">
          {options.map((option, index) => (
            <div
              className="p-3"
              onClick={(e) => {
                e.stopPropagation();
                setValue(option);
                setIsOpen(false);
              }}
              key={index}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
