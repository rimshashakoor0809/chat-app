const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.generateToken = (payload, expiryTime, secret) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiryTime
  });
}
exports.verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
}

exports.hashedToken = (token) => {
  return crypto.createHash('sha256').update(token.toString()).digest('hex');
}