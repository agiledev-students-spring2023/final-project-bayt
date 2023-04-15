#!/usr/bin/env node
const app = require("./app")
const server = require("./app") // load up the web server
const port = 8000 // the port to listen to for incoming requests
require("./middleware/logging.middleware") // load middlewares

// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})
// a function to stop listening to the port
const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}