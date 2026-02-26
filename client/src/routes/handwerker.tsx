import Onboarding from '@/features/worker-onboarding/components/Onboarding';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/handwerker')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Onboarding />;
}
