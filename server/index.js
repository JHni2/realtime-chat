const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');
const multer = require('multer');
const path = require('path');

const app = express();
require('dotenv').config();

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      done(null, file.originalname.replace(/\s/g, ''));
    },
    destination(req, file, done) {
      console.log(file);
      done(null, path.join(__dirname, 'images'));
    },
  }),
});

const uploadMiddleware = upload.single('imageFile');

app.use(uploadMiddleware);
app.use(express.json());
app.use(cors());
app.use(express.static('images'));

// 라우트 모듈 api 경로에 연결
app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

app.get('/', (req, res) => {
  res.send('Welcome chat app APIs');
});

app.post('/api/upload', (req, res) => {
  if (!req.file) {
    return res.status(400).send('업로드 실패했습니다.');
  }
  res.status(200).send('업로드 성공했습니다.');
});

const port = process.env.PORT;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(`server running on Port ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((error) => console.log('MongoDB 연결 실패', error.message));
