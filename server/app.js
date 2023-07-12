const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { Server } = require('socket.io');

const app = express();


// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// creates server for us
const server = http.createServer(app);
const port = 3001


// connect express app with socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET','POST']
  }
})

// checks if someone is connected with the server
io.on('connection', socket => {
  console.log('User Connected🔏: ', socket.id);

  socket.on('join_room', data => {
    socket.join(data)
    console.log(`User with ID: ${socket.id} joined the room: ${data}`);

  })

  socket.on('send_message', data => {
    console.log('Message', data);
    socket.to(data?.room).emit('receive_message',data)
    

  })

  socket.on('disconnected', socket => {
    console.log('User Disconnected😞: ', socket.id);
  })
})

server.listen(port, () => {
  console.log(`Server Activated 🚀 at port: ${port}`)
})

