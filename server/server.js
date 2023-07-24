const app = require("./app");
const http = require('http');
const dotenv = require('dotenv');
const socket = require('socket.io');
const sequelize = require('./connect');
const initializeDatabase = require('./databaseInitializer');



dotenv.config({ path: './.env' });

const port = process.env.PORT;


// test connection 
sequelize.authenticate().then(() => {
  console.log('MYSQL Connection has been established successfully.🔥');
}).catch(err => {
  console.log('Unable to connect to the database:', err);
})


// database synchronization

initializeDatabase();

// listening to port
const server = app.listen(port, () => {
  console.log(`Server Activated: Application has started at port ${port}💖`);
});

// sockets

// connect express app with socket.io
const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  }
})

// store all online users inside map
global.onlineUsers = new Map();

io.on('connection', socket => {
  console.log('Socket Connection completed')
  global.chatSocket = socket;

  socket.on('add_user', userId => {
    console.log('user added', userId)

    onlineUsers.set(userId, socket.id)
    console.log('onlineUsers after adding user:', onlineUsers);
  })

  socket.on('send_msg', data => {
    console.log('sender data:', data)
    const sendUserSocket = onlineUsers.get(data.receiver_id);
    console.log('sender socket', sendUserSocket)
    if (sendUserSocket) {
      console.log('recieving data:', data)

      socket.to(sendUserSocket).emit('msg_received', data.message)
    }
  });

  // Handle user disconnection and remove them from the onlineUsers Map
  socket.on('disconnect', () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
})





