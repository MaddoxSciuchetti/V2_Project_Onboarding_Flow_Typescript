import { Button } from '@/components/ui/selfmade/button';
import {
  Cell,
  CellHolder,
  GrowingItem,
  Items,
} from '@/components/ui/selfmade/table/Table';
import { PillBadge } from '@/features/all-tasks/components/ui/PillBadge';
import { IssueResponse } from '@/features/all-tasks/types/index.types';
import formatDateDe from '@/features/all-tasks/utilts/date.utils';
import { PriorityIndicator } from '@/features/all-tasks/utilts/priority.utils';
import { Headset, SquareDashedIcon } from 'lucide-react';

type WorkerTaskRowProps = {
  task: IssueResponse;
  onSelect: (taskId: string) => void;
};
export function WorkerTaskRow({ task, onSelect }: WorkerTaskRowProps) {
  const dateSource = task.dueDate ?? task.createdAt;
  const handleSelect = () => onSelect(task.id);

  return (
    <Items
      state="hover"
      className="relative flex items-center"
      onClick={handleSelect}
    >
      <span className="absolute ml-2 flex h-5 w-5 items-center justify-center text-black opacity-0 transition-opacity group-hover:opacity-100">
        <SquareDashedIcon className="h-5 w-5" />
      </span>
      <GrowingItem className="min-w-0 flex-1 py-0 pl-10">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <p className="typo-body-base shrink-0 whitespace-nowrap text-black">
            {`--- ${task.id.slice(0, 8)}`}
          </p>
          <PriorityIndicator priority={task.priority} />
          <p className="typo-body-base min-w-0 truncate text-black">
            {task.title}
          </p>
          <Button
            type="button"
            variant="default"
            className="ds-label-sm h-8 min-h-0 shrink-0 gap-1.5 rounded-2xl border border-[var(--border-brand)] px-3 py-0"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
            }}
          >
            Bearbeiten
          </Button>
        </div>
      </GrowingItem>
      <CellHolder>
        <Cell className="flex w-full max-w-none items-center justify-end gap-2 border-0">
          <PillBadge>
            <Headset className="size-4 shrink-0" aria-hidden />
            <span className="whitespace-nowrap">—</span>
          </PillBadge>
          <PillBadge>
            <span className="leading-4">{formatDateDe(dateSource)}</span>
          </PillBadge>
        </Cell>
      </CellHolder>
    </Items>
  );
}
