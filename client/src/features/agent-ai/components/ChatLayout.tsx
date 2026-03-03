import AsyncWrapper from '@/components/alerts/layout-wrapper/AsyncWrapper';
import useAuth from '@/features/user-profile/hooks/use-Auth';
import ChatDisplay from './chat/ChatDisplay';
import InputBar from './chat/InputBar';

type ChatLayoutProps = {};

const ChatLayout = ({}: ChatLayoutProps) => {
  const { user, isError, isLoading } = useAuth();

  return (
    <>
      <AsyncWrapper
        isLoading={isLoading}
        isError={isError || !user}
        userpermission={user?.user_permission}
        requiredpermission={'CHEF'}
      >
        <div className="h-full">
          <ChatDisplay>
            <InputBar />
          </ChatDisplay>
        </div>
      </AsyncWrapper>
    </>
  );
};

export default ChatLayout;
