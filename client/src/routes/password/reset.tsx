import { ResetPassword } from '@/features/auth/components/ResetPassword';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/password/reset')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResetPassword />;
}
