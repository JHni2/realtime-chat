import { useState, useContext } from 'react';
import { ChatContext } from '.././context/ChatContext';
import { AuthContext } from '.././context/AuthContext';

const ImageUpload = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, sendImageMessage } = useContext(ChatContext);
  const [imageMessage, setImageMessage] = useState('');

  const converToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageMessage(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  const uploadImage = () => {
    console.log('사진을 업로드합니다');
    sendImageMessage(imageMessage, user, currentChat._id, setImageMessage);
    setImageMessage('');
  };

  const deleteImage = () => {
    document.getElementById('imageMessage').remove();
    setImageMessage('');
  };

  return (
    <div>
      <input id="imageMessage" accept=".jpg,.png" type="file" onChange={converToBase64} />
      {imageMessage && <img width={100} height={100} src={imageMessage} />}
      <div>
        <span className="upload-image-btn" onClick={uploadImage}>
          업로드
        </span>
      </div>
      <div>
        <span className="delete-image-btn" onClick={deleteImage}>
          X
        </span>
      </div>
    </div>
  );
};

export default ImageUpload;
