import { useState, useContext, useRef } from 'react';
import { ChatContext } from '.././context/ChatContext';
import { AuthContext } from '.././context/AuthContext';
import addBtn from '.././assets/addBtn.svg';

const ImageUpload = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, sendImageMessage } = useContext(ChatContext);
  const [imageMessage, setImageMessage] = useState('');
  const [imageMessageName, setImageMessageName] = useState('');
  const imageInput = useRef();

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
    imageInput.current.value = '';
    setImageMessage('');
  };

  return (
    <div>
      <input ref={imageInput} id="imageMessage" accept=".jpg,.png" type="file" onChange={converToBase64} />
      <label htmlFor="imageMessage">
        <img className="add-btn" src={addBtn} alt="add-btn" width={20} height={20} />
      </label>
      {imageMessage && (
        <div className="image-preview-container">
          <img className="image-preview" src={imageMessage} alt={imageMessageName} />
          <div>
            <div className="delete-image-btn-bg">
              <span className="delete-image-btn" onClick={deleteImage}>
                ✖
              </span>
            </div>
            <div className="upload-image-btn-bg">
              <span className="upload-image-btn" onClick={uploadImage}>
                ✔
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
