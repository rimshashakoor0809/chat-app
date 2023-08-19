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
  .route('/change-password')
  .post(authorize.verifyUser, UserController.changePassword);

router
  .route('/logout')
  .post(authorize.verifyUser, UserController.logout);



router
  .route('/all')
  .get(authorize.verifyUser, UserController.getUsersList);

router
  .route('/status')
  .patch(authorize.verifyUser, UserController.updateStatus);

router
  .route('/:id')
  .get(UserController.getUserWithID);

// router
//   .route('/google/callback')
//   .post(UserController.loginWithGoogle);

module.exports = router;