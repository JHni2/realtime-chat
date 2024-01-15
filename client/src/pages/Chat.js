import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import PotentialChats from '../components/chat/PotentialChats';
import ChatBox from '../components/chat/ChatBox';
import Avatar from '../components/chat/Avatar';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);
  console.log(user.name);

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <Avatar userName={user.name} isSelf={true} size={48} />
        <div className="chat-line" />
        {userChats?.length < 1 ? null : (
          <div className="chat-users">
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
            <PotentialChats />
          </div>
        )}
      </div>
      <ChatBox />
    </div>
  );
};

export default Chat;
