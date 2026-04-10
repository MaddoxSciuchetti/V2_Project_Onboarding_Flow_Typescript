import Company from '@/features/settings/company/Company';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/company')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Company />;
}
