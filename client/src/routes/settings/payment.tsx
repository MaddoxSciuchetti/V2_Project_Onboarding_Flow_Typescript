import Payments from '@/features/settings/payments/Payments';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/payment')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Payments />;
}
