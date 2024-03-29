import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import moment from 'moment';
import ImageUpload from '../../utils/imageUpload';
import { downloadImage } from '../../utils/imageDownload';
import Avatar from './Avatar';
import downlaod from '../../assets/download.svg';
import ImageModal from '../../components/ImageModal';
import { baseUrl } from '../../utils/services';

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const scroll = useRef();
  const serverUrl = baseUrl.slice(0, -3);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
              <div
                ref={scroll}
                key={index}
                className={message?.senderId === user?._id ? 'message-self' : 'message-other'}
              >
                {array[index - 1] &&
                message.senderId === array[index - 1].senderId &&
                moment(message.createdAt).isSame(array[index - 1].createdAt, 'minute')
                  ? null
                  : message?.senderId !== user?._id && <Avatar userName={recipientUser?.name} size={60} />}
                {message.contentType === 'text' ? (
                  <div>
                    <span className="message-text">{message.content}</span>
                  </div>
                ) : (
                  <div className={message?.senderId === user?._id ? 'message-self ' : 'message-other '}>
                    <ImageModal imageUrl={selectedImage} open={modalOpen} onClose={handleCloseModal} />
                    <div className="image-container">
                      <div className="image-wrapper">
                        <img
                          onClick={(e) => handleImageClick(e.target.src)}
                          className="message-image"
                          src={serverUrl + message.content}
                          alt={message.imageName}
                        />
                        <span className="download-image-btn" onClick={() => downloadImage(message)}>
                          <img src={downlaod} alt="download-btn" width={25} />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {array[index + 1] &&
                message.senderId === array[index + 1].senderId &&
                moment(message.createdAt).isSame(array[index + 1].createdAt, 'minute') ? null : (
                  <p className="message-footer">{moment(message.createdAt).calendar()}</p>
                )}
              </div>
            );
          })}
      </div>
      <div className="chat-input">
        <div className="chat-input-bg">
          <ImageUpload />
          <input
            className="chat-input-message"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            onKeyDown={(e) => pressEnter(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
