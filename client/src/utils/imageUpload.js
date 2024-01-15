import { useState, useContext } from 'react';
import { ChatContext } from '.././context/ChatContext';
import { AuthContext } from '.././context/AuthContext';
import addBtn from '.././assets/addBtn.svg';

const ImageUpload = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, sendImageMessage } = useContext(ChatContext);
  const [imageMessage, setImageMessage] = useState('');
  const [imageMessageName, setImageMessageName] = useState('');

  const converToBase64 = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageMessage(reader.result);
        setImageMessageName(file.name);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };

  const uploadImage = () => {
    console.log('사진을 업로드합니다');
    sendImageMessage(imageMessage, user, currentChat._id, setImageMessage, imageMessageName);
    setImageMessage('');
  };

  const deleteImage = () => {
    document.getElementById('imageMessage').remove();
    setImageMessage('');
  };

  return (
    <div>
      <input id="imageMessage" accept=".jpg,.png" type="file" onChange={converToBase64} />
      <label htmlFor="imageMessage">
        <img className="add-btn" src={addBtn} alt="add-btn" width={20} height={20} />
      </label>
      {imageMessage && (
        <div>
          <img width={100} height={100} src={imageMessage} />
          <div>
            <span className="delete-image-btn" onClick={deleteImage}>
              X
            </span>
            <span className="upload-image-btn" onClick={uploadImage}>
              업로드
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
