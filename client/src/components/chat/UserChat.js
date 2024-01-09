import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import userAvatar from '../../assets/userAvatar.svg';

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);

  return (
    <div>
      <div>
        <img src={userAvatar} height={35} />
      </div>
      <div>
        <div className="name">{recipientUser?.name}</div>
        <div className="text">Text Message</div>
      </div>
      <div></div>
    </div>
  );
};

export default UserChat;
