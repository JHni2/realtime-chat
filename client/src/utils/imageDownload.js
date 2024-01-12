const convertToDataURL = (imageMessage) => {
  return fetch(imageMessage)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    });
};

export const downloadImage = async (imageMessage) => {
  const a = document.createElement('a');
  a.href = await convertToDataURL(imageMessage.content);
  a.download = imageMessage.imageName ?? 'download';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
