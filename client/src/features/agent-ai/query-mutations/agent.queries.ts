import { mutationOptions } from '@tanstack/react-query';
import { sendAgentMessage } from '../apis/agent.apis';
import { SENDAGENT } from '../consts/angent.consts';

export const agentQueries = {
  sendMessage: () =>
    mutationOptions({
      mutationKey: [SENDAGENT],
      mutationFn: sendAgentMessage,
    }),
};
