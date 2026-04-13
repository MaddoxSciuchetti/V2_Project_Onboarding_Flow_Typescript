import { apiJson } from '@/config/apiClient';
import {
  IssueOrgStatus,
  ListIssueStatusesResponse,
} from './issue-statuses.types';

export async function fetchIssueStatuses(): Promise<IssueOrgStatus[]> {
  const res = await apiJson.get<ListIssueStatusesResponse>('/org/statuses', {
    params: { entityType: 'issue' },
  });
  return res.statuses;
}

export async function createIssueStatus(name: string): Promise<IssueOrgStatus> {
  return apiJson.post<IssueOrgStatus, { entityType: 'issue'; name: string }>(
    '/org/statuses',
    { entityType: 'issue', name }
  );
}

export async function updateIssueStatus(
  id: string,
  name: string
): Promise<IssueOrgStatus> {
  return apiJson.patch<IssueOrgStatus, { name: string }>(
    `/org/statuses/${id}`,
    { name }
  );
}

export async function deleteIssueStatus(id: string): Promise<void> {
  return apiJson.delete(`/org/statuses/${id}`);
}
