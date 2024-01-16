import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import Avatar from './Avatar';

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <>
      {potentialChats.length !== 0 && <p className="potential-title">Start Chat</p>}
      <div className="potential-users">
        {potentialChats &&
          potentialChats.map((u, index) => {
            const isOnline = onlineUsers?.some((user) => user?.userId === u._id);
            return (
              <div key={index} onClick={() => createChat(user._id, u._id)}>
                <Avatar userName={u.name} size={48} isOnline={isOnline} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
