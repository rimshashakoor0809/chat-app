const express = require('express');
const UserController = require('../controllers/user');
const authorize = require('../utils/auth');
// router middleware

const router = express.Router();

router
  .route('/register')
  .post(UserController.signUpUser);


router
  .route('/login')
  .post(UserController.login);



router
  .route('/all')
  .get(authorize.verifyUser, UserController.getUsersList);

router
  .route('/status')
  .patch(authorize.verifyUser, UserController.updateStatus);

router
  .route('/:id')
  .get(UserController.getUserWithID);


module.exports = router;