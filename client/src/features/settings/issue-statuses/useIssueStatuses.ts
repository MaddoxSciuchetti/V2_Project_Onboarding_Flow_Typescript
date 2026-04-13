import queryClient from '@/config/query.client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createIssueStatus,
  deleteIssueStatus,
  fetchIssueStatuses,
  updateIssueStatus,
} from './issue-statuses.api';

export const ISSUE_STATUSES_QUERY_KEY = ['org', 'issue-statuses'] as const;

export function useIssueStatuses() {
  const query = useQuery({
    queryKey: ISSUE_STATUSES_QUERY_KEY,
    queryFn: fetchIssueStatuses,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ISSUE_STATUSES_QUERY_KEY });

  const createMutation = useMutation({
    mutationFn: createIssueStatus,
    onSuccess: () => {
      toast.success('Status hinzugefügt.');
      void invalidate();
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || 'Status konnte nicht erstellt werden.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateIssueStatus(id, name),
    onSuccess: () => {
      toast.success('Status gespeichert.');
      void invalidate();
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || 'Status konnte nicht gespeichert werden.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteIssueStatus,
    onSuccess: () => {
      toast.success('Status gelöscht.');
      void invalidate();
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || 'Status konnte nicht gelöscht werden.');
    },
  });

  return {
    statuses: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    createStatus: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateStatus: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteStatus: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}
