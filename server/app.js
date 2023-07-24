const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const cors = require('cors');
const http = require('http');
const util = require('util');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const swaggerJsDoc = YAML.load('./api.yaml');
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');


const app = express();

// const options = {
//   definition: {
//     openapi: '3.0.3',
//     info: {
//       title: 'Chat Application API',
//       version: '1.0.0',
//       description: 'Simple chat-application API'
//     },
//     servers: ['http://localhost:3001'],
//   },
//   apis: ['./routes/*.js']
// }

// const specs = swaggerDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc))


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








module.exports = app;
