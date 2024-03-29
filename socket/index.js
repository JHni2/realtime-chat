const { Server } = require('socket.io');
const io = new Server({ cors: 'http://localhost:3000' });

let onlineUsers = [];

// 클라이언트가 socketio 서버에 접속했을 때
io.on('connection', (socket) => {
  console.log('user 연결', socket.id);

  socket.on('addNewUser', (userId) => {
    !onlineUsers.some((user) => user.userId === userId) && onlineUsers.push({ userId, socketId: socket.id });

    console.log(onlineUsers);
    io.emit('getOnlineUsers', onlineUsers);
  });

  socket.on('sendMessage', (message) => {
    const user = onlineUsers.find((user) => user.userId === message.recipientId);
    if (user) {
      io.to(user.socketId).emit('getMessage', message);
    }
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit('getOnlineUsers', onlineUsers);
  });
});

io.listen(8080);
