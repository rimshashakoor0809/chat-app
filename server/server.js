const app = require("./app");
const http = require('http');

// creates server for us
const server = http.createServer(app);
const port = 3001


server.listen(port, () => {
  console.log(`Server Activated 🚀 at port: ${port}`)
})


