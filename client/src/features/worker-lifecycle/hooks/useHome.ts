import { useSidebar } from '@/components/ui/sidebar/sidebar';
import { LifecycleType } from '@/features/task-management/types/index.types';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { workerLifecycleQueries } from '../query-options/queries/worker-lifycycle.queries';
import { WorkerListMode } from '../types/index.types';

function useHome() {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<boolean>(false);
  const { toggleSidebar } = useSidebar();
  const [mode, setMode] = useState<WorkerListMode>('active');

  const navigate = useNavigate({ from: '/' });

  const toggleModal = () => {
    setModal((prev) => !prev);
    toggleSidebar();
  };

  const { data, error, isSuccess } = useQuery(
    workerLifecycleQueries.workerData(mode)
  );

  const isEmpty = isSuccess && data?.length === 0;

  const filtered = data?.filter((item) => {
    const matchesSearch = item.vorname
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesMode =
      mode === 'archived' ? item.archivedAt !== null : item.archivedAt === null;

    return matchesSearch && matchesMode;
  });

  const handleNavigate = (
    taskId: number,
    form_type: LifecycleType,
    workerName: string
  ) => {
    navigate({
      to: '/user/$Id',
      params: { Id: String(taskId) },
      search: {
        lifecycleType: form_type,
        workerName,
        prevPage: 'Worker Lifecycle',
      },
    });
  };

  return {
    isEmpty,
    filtered,
    handleNavigate,
    modal,
    mode,
    setMode,
    setSearch,
    search,
    error,
    toggleModal,
  };
}
export default useHome;
