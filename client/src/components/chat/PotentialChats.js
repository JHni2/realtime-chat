import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);

  return (
    <div>
      <span>start chat</span>
      {potentialChats &&
        potentialChats.map((u, index) => {
          return (
            <div key={index} onClick={() => createChat(user._id, u._id)}>
              {u.name}
            </div>
          );
        })}
      <hr />
    </div>
  );
};

export default PotentialChats;
