import ChatLayout from '@/features/agent-ai/components/ChatLayout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/agent-ai')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChatLayout />;
}
