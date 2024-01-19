import { useState, useContext, useRef } from 'react';
import { ChatContext } from '.././context/ChatContext';
import { AuthContext } from '.././context/AuthContext';
import addBtn from '.././assets/addBtn.svg';

const ImageUpload = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, sendImageMessage } = useContext(ChatContext);
  const [imageMessage, setImageMessage] = useState('');
  const [imageMessageName, setImageMessageName] = useState('');
  const imageInputRef = useRef();
  const [imageFile, setImageFile] = useState(null);

  const converToBase64 = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const fileType = file.type;
    setImageFile(file);

    if (fileType !== 'image/png' && fileType !== 'image/jpg') {
      alert('jpg, png 확장자만 업로드할 수 있습니다.');
      return;
    }

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageMessage(reader.result);
        setImageMessageName(file.name.replace(/\s/g, ''));
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };

  const uploadImage = () => {
    console.log('사진을 업로드합니다');

    sendImageMessage(imageMessage, user, currentChat._id, setImageMessage, imageMessageName, imageFile);
    setImageMessage('');
  };

  const deleteImage = () => {
    imageInputRef.current.value = '';
    setImageMessage('');
  };

  return (
    <div>
      <form action="http://localhost:5000/api/upload" method="POST" encType="multipart/form-data">
        <input
          ref={imageInputRef}
          id="imageMessage"
          accept=".jpg,.png"
          type="file"
          name="imageFile"
          onChange={converToBase64}
        />
        <button className="sbumit-image-btn" type="submit">
          Upload
        </button>
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
      </form>
    </div>
  );
};

export default ImageUpload;
