import { Modal, Image } from 'antd';

const PhotoModal = ({ imageUrl, open, onClose }) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} width={800} centered>
      <Image src={imageUrl} width="100%" />
    </Modal>
  );
};

export default PhotoModal;
