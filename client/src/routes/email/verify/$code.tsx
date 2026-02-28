import { VerifyEmail } from '@/features/auth/components/VerifyEmail';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/email/verify/$code')({
  component: RouteComponent,
});

function RouteComponent() {
  return <VerifyEmail />;
}
