const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
}

exports.hashedToken = (token) => {
  return crypto.createHash('sha256').update(token.toString()).digest('hex');
}