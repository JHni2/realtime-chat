import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  console.log(onlineUsers);

  return (
    <div>
      <span>start chat</span>
      {potentialChats &&
        potentialChats.map((u, index) => {
          return (
            <div key={index} onClick={() => createChat(user._id, u._id)}>
              {u.name}
              <span
                className={onlineUsers?.some((user) => user?.userId === u?._id) ? 'user-online' : 'user-offline'}
              ></span>
            </div>
          );
        })}
      <hr />
    </div>
  );
};

export default PotentialChats;
