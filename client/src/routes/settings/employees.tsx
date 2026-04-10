import Mitarbeiter from '@/features/settings/mitarbeiter/Mitarbeiter';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/employees')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Mitarbeiter />;
}
