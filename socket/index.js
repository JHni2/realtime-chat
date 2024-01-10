// const { Server } = require('socket.io');
// const io = new Server({ cors: 'http://localhost:5000' });

// let onlineUsers = [];

// io.on('connection', (socket) => {
//   console.log('user 연결', socket.id);

//   socket.on('addNewUser', (userId) => {
//     !onlineUsers.some((user) => user.userId === userId) && onlineUsers.push({ userId, socketId: socket.id });

//     console.log(onlineUsers);
//     io.emit('getOnlineUsers', onlineUsers);
//   });
// });

// io.listen(3000);

const { Server } = require('socket.io');
const io = new Server({ cors: { origin: 'http://localhost:5000', methods: ['GET', 'POST'] } });

io.on('connection', (socket) => {
  console.log('hi');
});

io.listen(3000);
