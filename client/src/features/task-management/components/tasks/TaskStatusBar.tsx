import { cn } from '@/lib/trycatch';

type TaskStatusBarProps = {
  isSelected: boolean;
  index: number;
  statusConfig: { className: string; dotClassName?: string };
  task: {
    description: string;
    is_substitute: boolean;
    substituteOwner: string;
    officialOwner: string;
  };
};

const TaskStatusBar = ({
  isSelected,
  index,
  statusConfig,
  task,
}: TaskStatusBarProps) => {
  return (
    <>
      <span
        className={cn(
          'text-sm w-5 shrink-0',
          isSelected
            ? 'text-[var(--foreground)] opacity-60'
            : 'text-[var(--muted-foreground)]'
        )}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <span
        className={cn(
          'h-2 w-2 rounded-full shrink-0 transition-all',
          statusConfig.dotClassName ?? statusConfig.className,
          isSelected && 'h-2.5 w-2.5'
        )}
      />
      <span
        className={cn(
          'flex-1 text-sm truncate font-semibold',
          isSelected
            ? 'text-[var(--foreground)] font-semibold'
            : 'text-[var(--foreground)]'
        )}
      >
        {task.description}
      </span>
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={cn(
            'text-sm bg-[var(--muted)] px-2 py-1 rounded-full',
            task.is_substitute
              ? 'text-[var(--muted-foreground)] opacity-50'
              : isSelected
                ? 'text-[var(--foreground)] opacity-70'
                : 'text-[var(--muted-foreground)]'
          )}
        >
          {task.officialOwner}
        </span>

        {task.is_substitute && (
          <span className="text-sm bg-[var(--muted)] px-2 py-1 rounded-full font-semibold text-[var(--foreground)]">
            {task.substituteOwner}
          </span>
        )}
      </div>
    </>
  );
};

export default TaskStatusBar;
