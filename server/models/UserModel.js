
const sequelize = require('../connect');
const Sequelize = require('sequelize');


const User = sequelize.define('user_table', {
  user_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  },

}, {
  freezeTableName: true
})

module.exports = User;


// User.sync().then(() => {
//   console.log('Table & model synced successfully.🔥');
// }).catch(err => {
//   console.log('Unable to sync to the database:', err);
// })