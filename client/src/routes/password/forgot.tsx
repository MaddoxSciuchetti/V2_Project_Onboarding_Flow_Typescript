import { ForgotPassword } from '@/features/auth/components/ForgotPassword';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/password/forgot')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPassword />;
}
