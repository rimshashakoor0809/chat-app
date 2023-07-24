const express = require('express');
const ChatController = require('../controllers/chat');
const authorize = require('../utils/auth');
// router middleware

const router = express.Router();

router
  .route('/message')
  .post(authorize.verifyUser, ChatController.sendMessage)

router
  .route('/message/:receiverId')
  .get(authorize.verifyUser, ChatController.fetchAllMessages)


module.exports = router;