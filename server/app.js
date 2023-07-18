const { Server } = require('socket.io');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const cors = require('cors');
const http = require('http');
const util = require('util');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');


const app = express();

dotenv.config();


/* Middleware */

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

});


/* Routes */
app.use('/api/chat-app/users', userRoute);
app.use('/api/chat-app/chat', chatRoute);

// global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  })
})



// const server = http.createServer(app);

// // connect express app with socket.io
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST']
//   }
// })

// // checks if someone is connected with the server
// io.on('connection', socket => {

//   console.log('User Connected🔏: ', socket.id);

//   socket.on('join_room', data => {

//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined the room: ${data}`);

//   })

//   // sending messages

//   socket.on('send_message', async (data) => {

//     console.log('Message', data);
//     try {


//       socket.to(data?.room).emit('receive_message', data);

//     } catch (error) {

//       console.log('Error:', error);

//     }

//   })

//   socket.on('disconnected', socket => {
//     console.log('User Disconnected😞: ', socket.id);
//   })
// })



module.exports = app;
