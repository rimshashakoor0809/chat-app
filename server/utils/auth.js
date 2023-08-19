const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const ErrorHandler = require('./ErrorHandler');
const { GenerateToken, generateToken, verifyToken } = require('./TokenHandler');
const User = require('../models/UserModel');
const Token = require('../models/Token');

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

  

  const tokenCookie = req.cookies.authTokens;

  if (!tokenCookie) {
    return next(ErrorHandler({ status: 401, message: 'Unauthorized User. No token found👮' }));
  }

  const [accessToken, refreshToken] = tokenCookie.split('|');

  // console.log('accessToken', accessToken);
  // console.log('refreshToken', refreshToken);


  try {

    const decoded = verifyToken(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    return next();

  } catch (err) {

    console.log('Checking Error:', err)
    // Token verification failed
    if (err.name === 'TokenExpiredError') {

      try {

        // Check if the refresh token matches any of the tokens stored in the database for the user
        const userRefreshTokens = await Token.findOne({
          where: {
            token: refreshToken
          },
        });


        if (!userRefreshTokens) {
          return next(ErrorHandler({ status: 401, message: 'Invalid refresh token. Please log in again.' }));
        }

        const decodedRefresh = verifyToken(refreshToken, process.env.JWT_SECRET_REFRESH);

        // If the refresh token is valid, generate a new access token and send it back
        const payload = {
          id: decodedRefresh.id,
          name: decodedRefresh.name,
          email: decodedRefresh.email,
          status: decodedRefresh.status,
        };

        const newAccessToken = generateToken(payload, '1min', process.env.JWT_SECRET);
        req.user = payload;

        const combinedTokens = `${newAccessToken}|${refreshToken}`;

        res.cookie('authTokens', combinedTokens, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60),
          sameSite: 'none',
          secure: true
        });
        return next();
      }

      catch (refreshErr) {
        console.log('Checking error:', refreshErr)
        return next(ErrorHandler({ status: 401, message: 'Invalid refresh token. Please log in again.' }));
      }

    }

    // Other errors
    return next(ErrorHandler({ status: 401, message: 'Invalid token👮' }));
  }

};





