const Sequelize = require('sequelize');

const dbConfig = {
  HOST: '127.0.0.1',
  USERNAME: 'root',
  PASSWORD: 'password',
  DATABASE: 'chat_app_schema',
  dialect: 'mysql',

}


module.exports = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USERNAME,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }

)


