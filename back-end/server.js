#!/usr/bin/env node
const app = require("./app")
const server = require("./app") // load up the web server
const port = 5000 // the port to listen to for incoming requests
// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})
// a function to stop listening to the port
const close = () => {
  listener.close()
}

/* Error handler middleware inspired FROM https://github.com/geshan/expressjs-structure/blob/master/index.js */ 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  next();
});

module.exports = {
  close: close,
}