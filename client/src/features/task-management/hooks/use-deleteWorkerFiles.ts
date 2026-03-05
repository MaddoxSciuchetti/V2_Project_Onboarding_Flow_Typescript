import { useMutation } from '@tanstack/react-query';
import { workerMutations } from '../query-options/mutations/query.mutations';

function useDeleteWorkerFiles(id: number) {
  const { mutate: deleteFiles } = useMutation(workerMutations.deleteWorker(id));

  return { deleteFiles };
}
export default useDeleteWorkerFiles;
