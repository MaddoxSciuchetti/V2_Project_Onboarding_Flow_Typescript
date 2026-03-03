import { Send } from 'lucide-react';
import useSendAgentMessage from '../../hooks/use-SendAgentMessage';
import Search from './Search';

type InputBarProps = {};

const InputBar = ({}: InputBarProps) => {
  const { sendAgentMessageMutation, message, setMessage } =
    useSendAgentMessage();
  return (
    <>
      <div className="flex justify-between border-2 w-170 mb-5 p-2 items-center rounded-4xl">
        <Search message={message} setMessage={setMessage} />
        <Send
          onClick={() => sendAgentMessageMutation.mutate(message)}
          className="mr-2 cursor-pointer"
        />
      </div>
    </>
  );
};

export default InputBar;
