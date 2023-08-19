const sequelize = require('./connect');
const User = require('./models/UserModel');
const Message = require('./models/MessageModel');
const Token = require('./models/Token');

module.exports = async function initializeDatabase() {
  try {
    await sequelize.sync();
    console.log('Database synchronization completed.');
  } catch (error) {
    console.error('An error occurred during database synchronization:', error);

  }
}
