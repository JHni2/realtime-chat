import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import Avatar from './Avatar';

const UserChat = ({ chat: currentChat, user }) => {
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

  return <Avatar userName={recipientUser?.name} isOnline={isOnline} size={48} />;
};

export default UserChat;
