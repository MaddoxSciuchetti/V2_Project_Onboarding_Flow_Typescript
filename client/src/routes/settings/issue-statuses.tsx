import IssueStatuses from '@/features/settings/issue-statuses/IssueStatuses';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/issue-statuses')({
  component: RouteComponent,
});

function RouteComponent() {
  return <IssueStatuses />;
}
