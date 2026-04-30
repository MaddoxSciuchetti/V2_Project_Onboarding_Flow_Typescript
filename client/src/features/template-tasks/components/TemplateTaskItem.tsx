import { Cell, GrowingItem, Items } from '@/components/ui/selfmade/table/Table';

import {
  TemplateTaskFormValues,
  TemplateTaskResponse,
} from '@/features/worker-task-management/types/index.types';
import { cn } from '@/lib/trycatch';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useDeleteTemplateTask } from '../hooks/useDeleteTemplateTask';
export type TemplateTaskItemProps = {
  templateTasks: TemplateTaskResponse[];
  setIsOpen: (isOpen: boolean) => void;
  setEditTemplateTask: (task: TemplateTaskFormValues) => void;
  setTemplateTaskState: (state: 'create' | 'edit') => void;
};

export function TemplateTaskItem({
  templateTasks,
  setIsOpen,
  setEditTemplateTask,
  setTemplateTaskState,
}: TemplateTaskItemProps) {
  console.log(templateTasks);
  const { deleteTemplateTask } = useDeleteTemplateTask();
  return (
    <div className="flex w-full min-w-0 flex-col divide-y divide-border-subtle">
      {templateTasks.map((task) => (
        <Items
          key={task.id}
          state="hover"
          className={cn(
            'group w-full min-w-0 cursor-pointer items-center justify-between gap-6',
            'px-6 py-4'
          )}
        >
          <GrowingItem
            className={cn(
              'min-w-0 flex-1 flex-col items-start gap-1',
              'py-0 pl-0 pr-4'
            )}
          >
            <p className="typo-body-sm text-text-primary">{task.taskName}</p>
            {task.taskDescription ? (
              <p className="typo-body-xs text-text-secondary line-clamp-3">
                {task.taskDescription}
              </p>
            ) : null}
          </GrowingItem>
          <Cell
            className={cn(
              'opacity-0 group-hover:opacity-100 w-auto flex gap-5 min-w-0 max-w-[min(100%,14rem)] shrink-0',
              'text-right typo-body-sm font-normal text-text-primary'
            )}
          >
            <PencilIcon
              onClick={() => {
                setIsOpen(true);
                setEditTemplateTask({
                  taskId: task.id,
                  taskName: task.taskName,
                  taskDescription: task.taskDescription,
                  defaultPriority: task.defaultPriority,
                  orderIndex: task.orderIndex,
                });
                setTemplateTaskState('edit');
              }}
            />
            <TrashIcon
              onClick={() => {
                deleteTemplateTask(task.id);
              }}
            />
          </Cell>
        </Items>
      ))}
    </div>
  );
}
