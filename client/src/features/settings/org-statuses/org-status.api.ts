import API from '@/config/apiClient';
import {
  ListOrgStatusesResponse,
  OrgStatus,
  StatusEntityType,
} from './org-status.types';

export async function fetchOrgStatuses(
  entityType: StatusEntityType
): Promise<OrgStatus[]> {
  const res = await API.get<ListOrgStatusesResponse, ListOrgStatusesResponse>(
    '/org/statuses',
    {
      params: { entityType },
    }
  );
  return res.statuses;
}

export async function createOrgStatus(
  entityType: StatusEntityType,
  name: string
): Promise<OrgStatus> {
  return API.post<OrgStatus, OrgStatus>('/org/statuses', { entityType, name });
}

export async function updateOrgStatus(
  id: string,
  name: string
): Promise<OrgStatus> {
  return API.patch<OrgStatus, OrgStatus, { name: string }>(
    `/org/statuses/${id}`,
    {
      name,
    }
  );
}

export async function deleteOrgStatus(id: string): Promise<void> {
  return API.delete(`/org/statuses/${id}`);
}
