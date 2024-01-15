import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import moment from 'moment';
import ImageUpload from '../../utils/imageUpload';
import { downloadImage } from '../../utils/imageDownload';
import Avatar from './Avatar';
import downlaod from '../../assets/download.svg';

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState('');
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!recipientUser)
    return (
      <div className="chat-no-user">
        <p>선택된 대화가 없습니다.</p>
      </div>
    );

  if (isMessagesLoading)
    return (
      <div className="chat-no-user">
        <p>로딩중...</p>
      </div>
    );

  const handleSendTextMessage = () => {
    sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    setTextMessage('');
  };

  const pressEnter = (e) => {
    if (e.key === 'Enter') {
      handleSendTextMessage();
    }
  };

  console.log(messages);

  return (
    <div className="chat-content">
      <div className="chat-header">
        <span>{recipientUser?.name}</span>
      </div>
      <div className="messages">
        {messages &&
          messages.map((message, index, array) => {
            return (
              <div ref={scroll} key={index} className={message?.senderId === user?._id ? 'message-self' : 'message-other'}>
                {message.contentType === 'text' ? (
                  <>
                    {array[index - 1] && array[index + 1] && message.senderId === array[index - 1].senderId && message.senderId === array[index + 1].senderId && moment(message.createdAt).isSame(array[index - 1].createdAt, 'minute') ? null : message?.senderId !== user?._id && <Avatar userName={recipientUser?.name} size={60} />}
                    <div>
                      <span className="message-text">{message.content}</span>
                      {array[index + 1] && moment(message.createdAt).isSame(array[index + 1].createdAt, 'minute') ? null : <p className="message-footer">{moment(message.createdAt).calendar()}</p>}
                    </div>
                  </>
                ) : (
                  <div className="download-image-container">
                    <img className="message-image" src={message.content} alt={message.imageName} />
                    <span className="downnload-image-btn" onClick={() => downloadImage(message)}>
                      <img src={downlaod} alt="download-btn" width={25} />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="chat-input">
        <div className="chat-input-bg">
          <ImageUpload />
          <input className="chat-input-message" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} onKeyDown={(e) => pressEnter(e)} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
