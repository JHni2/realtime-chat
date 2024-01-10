import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import moment from 'moment';
// import sendIcon from '../../assets/sendIcon.svg';

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState('');

  if (!recipientUser) return <p>선택된 대화가 없습니다.</p>;

  if (isMessagesLoading) return <p>로딩중...</p>;

  const handleSendTextMessage = () => {
    sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    setTextMessage('');
  };

  const pressEnter = (e) => {
    if (e.key === 'Enter') {
      handleSendTextMessage();
    }
  };

  return (
    <div>
      <div className="chat-header">
        <span>{recipientUser?.name}</span>
      </div>
      <div className="messages">
        {messages &&
          messages.map((message, index) => {
            return (
              <div key={index} className={message?.senderId === user?.id ? 'message-self' : 'message-other'}>
                <span>{message.text}</span>
                <span className="message-footer">{moment(message.createdAt).calendar()}</span>
              </div>
            );
          })}
      </div>
      <div className="chat-input">
        <input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} onKeyDown={(e) => pressEnter(e)} />
        <span className="sned-btn" onClick={handleSendTextMessage}>
          {/* <img src={sendIcon} height={20} /> */}
        </span>
      </div>
    </div>
  );
};

export default ChatBox;
