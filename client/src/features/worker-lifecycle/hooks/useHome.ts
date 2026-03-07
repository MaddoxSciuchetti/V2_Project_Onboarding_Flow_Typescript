import { useSidebar } from '@/components/ui/sidebar';
import { AddWorker } from '@/features/worker-lifecycle/schemas/zod.schemas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { addWorker } from '../api';
import { workerLifecycleMutations } from '../query-options/mutations/worker-lifycycle.mutations';
import { workerLifecycleQueries } from '../query-options/queries/worker-lifycycle.queries';
import { FormType, WorkerItem } from '../types/index.types';

function useHome() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const { toggleSidebar } = useSidebar();
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate({ from: '/' });

  const toggleModal = () => {
    setModal((prev) => !prev);
    toggleSidebar();
  };

  const { data, error, isSuccess } = useQuery<WorkerItem[]>(
    workerLifecycleQueries.workerData()
  );

  const isEmpty = isSuccess && data?.length === 0;

  const filtered = data?.filter((item) =>
    item.vorname.toLowerCase().includes(search.toLowerCase())
  );

  const deleteTaskMutation = useMutation(
    workerLifecycleMutations.deleteWorker()
  );

  const addWorkerMutation = useMutation({
    mutationFn: async (data: AddWorker) => {
      const response = await addWorker(data);
      return response;
    },
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({
          queryKey: ['allWorkerData'],
          refetchType: 'all',
        });
        toggleModal();
      }
    },
    onError: (error) => {
      throw new Error(
        'Fehler beim Hinzufügen des Mitarbeiters: ' + error.message
      );
    },
  });

  const handleNavigate = (taskId: number, form_type: FormType) => {
    console.log('in nvagiation', form_type);
    navigate({
      to: '/user/$Id',
      params: { Id: String(taskId) },
      search: { lifecycleType: form_type },
    });
  };

  return {
    isEmpty,
    filtered,
    deleteTaskMutation,
    createEmployeeMutation: addWorkerMutation,
    handleNavigate,
    modal,
    setSearch,
    search,
    error,
    toggleModal,
  };
}
export default useHome;
