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

export type OptionsObjekt = {
  label: string;
  value: string;
  action?: () => void;
  subOptions?: OptionsObjekt[];
};

type SelectDropdownProps<T extends string> = {
  state: State;
  size: Size;
  icon: LucideIcon;
  label?: string;
  options: OptionsObjekt[];
  setValue: (value: T) => void;
  value: string;
  onSubSelect?: (sub: OptionsObjekt, parent: OptionsObjekt) => void;
};

export function SelectDropdown<T extends string>({
  state,
  size,
  icon: Icon,
  label,
  options,
  setValue,
  value,
  onSubSelect,
}: SelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setIsOpen(false);
        setHoveredValue(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const close = () => {
    setIsOpen(false);
    setHoveredValue(null);
  };

  const handleParentSelect = (option: OptionsObjekt) => {
    if (option.subOptions?.length) return;
    setValue(option.value as T);
    option.action?.();
    close();
  };

  const handleSubSelect = (sub: OptionsObjekt, parent: OptionsObjekt) => {
    onSubSelect?.(sub, parent);
    sub.action?.();
    close();
  };

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
      <p className="typo-body-sm grow text-text-disabled">{value || label}</p>
      <Icon
        className={cn(
          'w-6 h-6 text-text-disabled transition-transform duration-200',
          isOpen ? 'rotate-90' : 'rotate-0'
        )}
      />
      {isOpen && (
        <div className="absolute z-10 p-2 bg-surface-page top-full rounded-xl border left-0 w-full">
          {options.map((option) => (
            <DropdownOption
              key={option.value}
              option={option}
              isHovered={hoveredValue === option.value}
              onHover={() => setHoveredValue(option.value)}
              onSelect={() => handleParentSelect(option)}
              onSubSelect={(sub) => handleSubSelect(sub, option)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type DropdownOptionProps = {
  option: OptionsObjekt;
  isHovered: boolean;
  onHover: () => void;
  onSelect: () => void;
  onSubSelect: (sub: OptionsObjekt) => void;
};

function DropdownOption({
  option,
  isHovered,
  onHover,
  onSelect,
  onSubSelect,
}: DropdownOptionProps) {
  const hasSubOptions = !!option.subOptions?.length;
  const showSubMenu = hasSubOptions && isHovered;

  return (
    <div className="relative" onMouseEnter={onHover}>
      <div
        className="cursor-pointer rounded-md px-2 py-1 hover:bg-surface-default"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {option.label}
      </div>
      {showSubMenu && (
        <DropdownSubMenu
          subOptions={option.subOptions!}
          onSelect={onSubSelect}
        />
      )}
    </div>
  );
}

type DropdownSubMenuProps = {
  subOptions: OptionsObjekt[];
  onSelect: (sub: OptionsObjekt) => void;
};

function DropdownSubMenu({ subOptions, onSelect }: DropdownSubMenuProps) {
  return (
    <div
      className="absolute right-full top-0 z-20 mr-2 min-w-40 rounded-xl border bg-surface-page p-2"
      onClick={(e) => e.stopPropagation()}
    >
      {subOptions.map((sub) => (
        <div
          key={sub.value}
          className="cursor-pointer rounded-md px-2 py-1 hover:bg-surface-default"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(sub);
          }}
        >
          {sub.label}
        </div>
      ))}
    </div>
  );
}
