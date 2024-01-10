import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
// import userAvatar from '../../assets/userAvatar.svg';

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

  return (
    <div>
      <span>{/* <img src={userAvatar} height={35} /> */}</span>
      <div>
        <div className="name">{recipientUser?.name}</div>
        <div className="text">Text Message</div>
      </div>
      <div>
        <span className={isOnline ? 'user-online' : 'user-offline'}></span>
      </div>
    </div>
  );
};

export default UserChat;
