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
            return (
              <div key={index} onClick={() => createChat(user._id, u._id)}>
                <Avatar userName={u.name} size={48} onlineUsers={onlineUsers} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
