export type IssueResponse = {
  id: string;
  workerEngagementId: string;
  createdByUserId: string;
  assigneeUserId: string | null;
  templateItemId: string | null;
  statusId: string;
  title: string;
  description: string | null;
  priority: 'urgent' | 'high' | 'medium' | 'low' | 'no_priority';
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};
