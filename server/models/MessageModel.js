const sequelize = require('../connect');
const Sequelize = require('sequelize');
const User = require('./UserModel'); // Import the User model

const Message = sequelize.define('message_table', {
  msg_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  sender_id: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  receiver_id: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  users: {
    type: Sequelize.STRING, // Use STRING data type to store the serialized array
    allowNull: false,
    defaultValue: '[]', // Set the defaultValue as a serialized empty array
    get() {
      const value = this.getDataValue('users');
      return JSON.parse(value); // Parse the serialized array back to an actual array when accessing it
    },
    set(value) {
      const serializedValue = JSON.stringify(value); // Serialize the array before storing it
      this.setDataValue('users', serializedValue);
    },
  },
  message: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true
});

// Define the associations
Message.belongsTo(User, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'receiver_id' });

module.exports = Message;
