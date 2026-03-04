import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { agentQueries } from '../query-mutations/agent.queries';
import { AgentResponse } from '../types/agent.types';

function useSendAgentMessage() {
  const [agentreply, setAgentReply] = useState<AgentResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendAgentMessageMutation = useMutation<AgentResponse, Error, string>({
    ...agentQueries.sendMessage(),
    onSuccess: (data) => {
      setAgentReply(data);
    },
  });
  const handleClick = () => {
    const message = inputRef.current?.value;
    if (!message?.trim()) return;
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    sendAgentMessageMutation.mutate(message);
  };

  return {
    handleClick,
    agentreply,
    inputRef,
    isPending: sendAgentMessageMutation.isPending,
  };
}

export default useSendAgentMessage;
