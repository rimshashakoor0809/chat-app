const app = require("./app");
const http = require('http');
const dotenv = require('dotenv');
const sequelize = require('./connect');
const initializeDatabase = require('./databaseInitializer');


dotenv.config({ path: './.env' });

const port = process.env.PORT;


// test connection 
sequelize.authenticate().then(() => {
  console.log('MYSQL Connection has been established successfully.🔥');
}).catch(err => {
  console.log('Unable to connect to the database:', err);
})


// database synchronization

initializeDatabase();

// listening to port
app.listen(port, () => {
  console.log(`Server Activated: Application has started at port ${port}💖`);
});




