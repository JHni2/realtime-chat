import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);

  console.log(potentialChats);

  return (
    <div>
      {potentialChats &&
        potentialChats.map((u, index) => {
          return (
            <div key={index} onClick={() => createChat(user._id, u._id)}>
              {u.name}
              <span></span>
            </div>
          );
        })}
    </div>
  );
};

export default PotentialChats;
