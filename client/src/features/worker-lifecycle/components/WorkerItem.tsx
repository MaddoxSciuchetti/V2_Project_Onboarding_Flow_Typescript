import '@/App.css';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import DropdownActionTrigger from '@/components/DropdownActionTrigger';
import useFetchProcessData from '@/features/employee-overview/hooks/useFetchProcessData';
import { LifecycleType } from '@/features/task-management/types/index.types';
import { useState } from 'react';
import useWorkerMutations from '../hooks/useWorkerMutaitons';
import { WorkerRecord, WorkerRecordMode } from '../types/index.types';
import { getFirstFormType } from '../utils/formtype';
import WorkerInfoModal from './WorkerInfoModal';
import WorkerItemInfo from './WorkerItemInfo';
import { WorkerEngagementControls } from './worker-row/WorkerEngagementControls';

type WorkerItemProps = {
  worker: WorkerRecord;
  mode: WorkerRecordMode;
  gotopage: (
    taskId: string,
    form_type: LifecycleType,
    workerName: string
  ) => void;
};

/**
 * Table row: identity + {@link WorkerEngagementControls} + phase + progress + row actions.
 */
export function Worker_Item({ worker, mode, gotopage }: WorkerItemProps) {
  const form_type = getFirstFormType(worker);
  const item_value = worker.id;
  const vorname = worker.firstName;
  const nachname = worker.lastName;

  const {
    isLoading: processLoading,
    completedTasksCount,
    totalTasks,
  } = useFetchProcessData(item_value);

  const { archiveWorkerMutation, deleteTaskMutation, unarchiveWorkerMutation } =
    useWorkerMutations();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const calculatePercent = (completedTasks: number, total: number) => {
    if (total <= 0) return 'text-[var(--lifecycle-progress-zero-text)]';
    const percent = (completedTasks / total) * 100;
    if (percent < 20) return 'text-[var(--lifecycle-progress-zero-text)]';
    if (percent >= 20 && percent < 100) return 'text-[var(--chart-3)]';
    if (percent === 100) return 'text-[var(--chart-2)]';
    return 'text-[var(--lifecycle-progress-zero-text)]';
  };

  const completedCount = completedTasksCount ?? 0;
  const totalCount = totalTasks ?? 0;
  const color = calculatePercent(completedCount, totalCount);

  return (
    <tr className="group rounded-2xl transition-colors">
      <td className="align-middle px-2 py-4 text-center text-sm">
        <WorkerItemInfo
          setIsInfoModalOpen={setIsInfoModalOpen}
          gotopage={gotopage}
          item_value={item_value}
          form_type={form_type}
          vorname={vorname}
          nachname={nachname}
        />
      </td>
      <td className="min-w-[12rem] max-w-[24rem] align-middle px-2 py-4 text-center">
        <WorkerEngagementControls
          workerId={item_value}
          engagement={worker.engagements[0]}
        />
      </td>
      <td
        className={
          form_type === 'onboarding'
            ? 'px-2 py-4 text-center align-middle text-sm text-[var(--lifecycle-onboarding-text)] underline'
            : 'px-2 py-4 text-center align-middle text-sm text-[var(--lifecycle-offboarding-text)] underline'
        }
        lang="en"
      >
        {form_type === 'offboarding' ? 'Offboarding' : 'Onboarding'}
      </td>

      <td className="px-2 py-4 text-center align-middle tabular-nums">
        <span className={color}>
          {processLoading ? '...' : completedCount}
        </span>
        <span className="font-medium text-foreground">/{totalCount}</span>
      </td>

      <td className="px-2 py-4 text-center align-middle">
        <div className="flex justify-center">
          <DropdownActionTrigger
          description="Aktionen"
          disabled={false}
          triggerIcon="more"
          actions={[
            {
              label: mode === 'active' ? 'Archivieren' : 'Wiederherstellen',
              action: () =>
                mode === 'active'
                  ? archiveWorkerMutation(item_value)
                  : unarchiveWorkerMutation(item_value),
              variant: 'default',
            },
            {
              label: 'Löschen',
              action: () => setIsDeleteModalOpen(true),
              variant: 'destructive',
            },
          ]}
        />
        </div>
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            deleteTaskMutation(item_value);
            setIsDeleteModalOpen(false);
          }}
        />
        <WorkerInfoModal
          isOpen={isInfoModalOpen}
          workerId={item_value}
          onClose={() => setIsInfoModalOpen(false)}
        />
      </td>
    </tr>
  );
}
