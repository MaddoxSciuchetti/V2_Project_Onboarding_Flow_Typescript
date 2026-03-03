import { ReactNode } from 'react';

type ChatDisplayProps = {
  children: ReactNode;
};

const ChatDisplay = ({ children }: ChatDisplayProps) => {
  return (
    <div className="flex items-end justify-center h-full border-2">
      <div className="flex flex-col justify-end border-2 h-full">
        {children}
      </div>
    </div>
  );
};

export default ChatDisplay;
