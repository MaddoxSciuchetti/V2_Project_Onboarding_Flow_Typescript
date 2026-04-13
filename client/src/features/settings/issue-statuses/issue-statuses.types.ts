export type IssueOrgStatus = {
  id: string;
  name: string;
  color: string | null;
  orderIndex: number;
  isDefault: boolean;
  usageCount: number;
};

export type ListIssueStatusesResponse = {
  statuses: IssueOrgStatus[];
};
