import useAuth from '@/features/user-profile/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitEvent, useState } from 'react';
import { updateWorkerData, updateWorkerHistory } from '../api/index.api';
import { FORMHISTORY, WORKERBYID } from '../consts/query-key.consts';
import { formSchema } from '../schemas/index.schema';

function useTaskSubmit(id: number) {
  const queryClient = useQueryClient();
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const closeSidebar = () => setSelectedTaskId(null);
  const { user } = useAuth();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData);

    const result = formSchema.safeParse(formValues);

    if (!result.success) {
      return;
    }
    if (!user) {
      return;
    }

    await updateWorkerHistory(result.data, user);
    await queryClient.invalidateQueries({
      queryKey: [FORMHISTORY, parseInt(result.data.id)],
    });
    await updateWorkerData(result.data);

    await queryClient.invalidateQueries({
      queryKey: [WORKERBYID, id],
    });

    closeSidebar();
  }

  return {
    handleSubmit,
    setSelectedTaskId,
    selectedTaskId,
  };
}

export default useTaskSubmit;
