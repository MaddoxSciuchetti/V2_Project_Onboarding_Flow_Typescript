import { useGetWorkerHistory } from '@/features/task-management/hooks/use-getWorkerHistory';
import { useQuery } from '@tanstack/react-query';
import { SubmitEvent } from 'react';
import { workerQueries } from '../../query-options/query.options';
import TaskHistory from '../task-history/TaskHistory';
import StatusBadgeBar from './StatusBadgeBar';
import WorkerFormHeader from './WorkerFormHeader';

interface FormProps {
  id_original: number;
  description: string;
  officialOwner: string;
  substituteOwner: string;
  editcomment: string;
  select_option: string;
  form_field_id: number;
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  onEdit: (
    id: number,
    description: string,
    editcomment: string,
    select_option: string,
    form_field_id: number
  ) => void;
  is_substitute: boolean;
}

function WorkerForm({
  id_original,
  description,
  officialOwner,
  substituteOwner,
  editcomment,
  select_option,
  form_field_id,
  onEdit,
  is_substitute,
}: FormProps) {
  const { historyData } = useGetWorkerHistory(id_original);
  const { data } = useQuery(workerQueries.getFoto());

  return (
    <div className="justify-center items-center hover:scale-101 mt-10">
      <div className="flex flex-col gap-5">
        <WorkerFormHeader
          description={description}
          onEdit={() =>
            onEdit(
              id_original,
              description,
              editcomment,
              select_option,
              form_field_id
            )
          }
        />
        <StatusBadgeBar
          is_substitute={is_substitute}
          substituteOwner={substituteOwner}
          officialOwner={officialOwner}
          select_option={select_option}
          editcomment={editcomment}
        />
        <TaskHistory historyData={historyData} data={data} />
      </div>
    </div>
  );
}

export default WorkerForm;
