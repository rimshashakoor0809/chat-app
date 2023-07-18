const http = require('http');
const app = require('../app');
const { Server } = require('socket.io');


const server = http.createServer(app);

// connect express app with socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

// checks if someone is connected with the server
io.on('connection', socket => {

  console.log('User Connected🔏: ', socket.id);

  socket.on('join_room', data => {

    socket.join(data)
    console.log(`User with ID: ${socket.id} joined the room: ${data}`);

  })

  // sending messages

  socket.on('send_message', async (data) => {

    console.log('Message', data);
    try {

    
      socket.to(data?.room).emit('receive_message', data);

    } catch (error) {

    }

  })

  socket.on('disconnected', socket => {
    console.log('User Disconnected😞: ', socket.id);
  })
})