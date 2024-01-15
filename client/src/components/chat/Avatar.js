import userDefaultImg from '../../assets/userDefaultImg.png';

const Avatar = (props) => {
  const { userName, isOnline, isSelf, size } = props;

  return (
    <div className={isSelf ? 'avatar-container avatar-self' : 'avatar-container'}>
      <div className="avatar-img">
        <img src={userDefaultImg} alt={userName} width={size} height={size} />
        {isOnline && <div className="avatar-online" />}
      </div>
      <span className="avatar-name">{userName}</span>
    </div>
  );
};

export default Avatar;
