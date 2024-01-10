import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
// import userAvatar from '../../assets/userAvatar.svg';

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);

  return (
    <div>
      <span>{/* <img src={userAvatar} height={35} /> */}</span>
      <div>
        <div className="name">{recipientUser?.name}</div>
        <div className="text">Text Message</div>
      </div>
      <div></div>
    </div>
  );
};

export default UserChat;
