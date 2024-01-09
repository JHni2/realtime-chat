import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import PotentialChats from '../components/chat/PotentialChats';
import ChatBox from '../components/chat/ChatBox';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);

  return (
    <div>
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <div>
          {isUserChatsLoading && <p>Loading chats...</p>}
          {userChats?.map((chat, index) => {
            return (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                <UserChat chat={chat} user={user} />
              </div>
            );
          })}
        </div>
      )}
      <ChatBox />
    </div>
  );
};

export default Chat;
