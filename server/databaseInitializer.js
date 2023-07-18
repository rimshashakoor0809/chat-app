const sequelize = require('./connect');
const User = require('./models/UserModel');
const Message = require('./models/MessageModel');

module.exports = async function initializeDatabase() {
  try {
    await sequelize.sync(); // Sync all models with the database
    console.log('Database synchronization completed.');
  } catch (error) {
    console.error('An error occurred during database synchronization:', error);

  }
}
