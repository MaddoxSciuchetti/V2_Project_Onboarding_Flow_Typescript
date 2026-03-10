import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit } from 'lucide-react';

type DropDownResuableProps<T> = {
  imgsrc: string;
  disabled?: boolean;
  description: string;
  action: () => void;
};

const DropDownResuable = <T,>({
  description,
  imgsrc,
  disabled,
  action,
}: DropDownResuableProps<T>) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Edit />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 bg-popover text-popover-foreground"
          align="start"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled={disabled}
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
              onClick={(e) => {
                e.stopPropagation();
                action();
              }}
            >
              {description}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownResuable;
