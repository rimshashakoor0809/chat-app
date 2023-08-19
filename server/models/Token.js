
const sequelize = require('../connect');
const Sequelize = require('sequelize');
const User = require('./UserModel');


const Token = sequelize.define('token_table', {
  token_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },

}, {
  freezeTableName: true
})

Token.belongsTo(User, { foreignKey: 'user_id' });


module.exports = Token;
