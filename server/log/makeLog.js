const fs = require('fs');
const path = require('path');

const date = new Date();
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const currentDate = `${year}${month}${day}`;

// 로그 폴더 생성
const makeDir = () => {
  const absoluteFolderPath = path.resolve(__dirname, currentDate);
  if (!fs.existsSync(absoluteFolderPath)) {
    fs.mkdirSync(absoluteFolderPath);
    console.log(`폴더 생성 O`);
  } else {
    console.log(`폴더 이미 존재`);
  }
};

// 로그 작성
const writeToLog = (chatId, senderId, content, contentType, createdAt) => {
  makeDir();

  const jsonData = {
    senderId: senderId,
    contentType: contentType,
    content: content,
    createdAt: createdAt,
  };

  const jsonString = JSON.stringify(jsonData);
  let existingData = [];
  let newChat = {};

  const relativeFilePath = path.join('.', currentDate, `${chatId}.json`);
  const absoluteFilePath = path.resolve(__dirname, relativeFilePath);

  try {
    const data = fs.readFileSync(absoluteFilePath, 'utf-8');
    existingData = JSON.parse(data);
  } catch (error) {
    fs.writeFileSync(absoluteFilePath, jsonString);
  }

  newChat = jsonData;

  existingData.push(newChat);

  const updatedJsonString = JSON.stringify(existingData);

  fs.writeFileSync(absoluteFilePath, updatedJsonString);

  console.log('로그 파일 작성 완료');
};

module.exports = { makeDir, writeToLog };
