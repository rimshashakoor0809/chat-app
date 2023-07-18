const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const ErrorHandler = require('./ErrorHandler');
const { GenerateToken } = require('./GenerateToken');
const User = require('../models/UserModel')

exports.isLoggedIn = () => {

  return function (req, res) {

    console.log('check');
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
      // console.log("MY token", token);
    }
    if (!token) {
      return res.json(false);
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        console.log('err', err);
        return res.json(false);
      }
      return res.json(true);
    });


  }
}


exports.verifyUser = async (req, res, next) => {

  console.log('User Check...')
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  }

  if (!token) {

    return next(ErrorHandler({ status: 401, message: 'Unauthorized User. No token found👮' }))
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if (err) return next(ErrorHandler({ status: 401, message: 'Invalid token👮' }));


    return req.user = decoded;



  });

  return next();

}


