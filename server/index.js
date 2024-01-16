const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

// 라우트 모듈 api 경로에 연결
app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

app.get('/', (req, res) => {
  res.send('Welcome chat app APIs');
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
