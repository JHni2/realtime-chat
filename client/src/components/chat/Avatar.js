import userDefaultImg from '../../assets/userDefaultImg.png';

const Avatar = (props) => {
  const { userName, isOnline, isSelf, size } = props;
  const defaultUser = ['JHni2', 'Hjung', 'APoint', 'Penta', 'AP3'];

  return (
    <div className={isSelf ? 'avatar-container avatar-self' : 'avatar-container'}>
      <div className="avatar-img">
        {props.userName && (
          <img
            src={defaultUser.includes(props.userName) ? `/${props.userName}.png` : userDefaultImg}
            alt={userName}
            width={size}
            height={size}
          />
        )}
      </div>
      <span className="avatar-name">{userName}</span>
      {isOnline && <div className="avatar-online" />}
    </div>
  );
};

export default Avatar;
