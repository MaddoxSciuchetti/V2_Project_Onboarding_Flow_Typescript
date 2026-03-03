import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import sendAgentMessage from '../apis/agent.apis';
import { SENDAGENT } from '../consts/angent.consts';

function useSendAgentMessage() {
  const [message, setMessage] = useState<string>('');

  const sendAgentMessageMutation = useMutation<string, Error, string>({
    mutationKey: [SENDAGENT],
    mutationFn: () => sendAgentMessage(message),

    onSuccess: () => {
      console.log('sucess');
      toast('Event has occured', {
        description: 'hello',
        action: {
          label: 'Uno',
          onClick: () => console.log('undo'),
        },
      });
      console.log('toast does not work');
    },
  });

  return { sendAgentMessageMutation, message, setMessage };
}

export default useSendAgentMessage;
