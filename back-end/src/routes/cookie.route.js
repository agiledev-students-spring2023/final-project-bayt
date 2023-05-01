const express = require("express") // CommonJS import style!

// a method that constains code to handle cookie-related routes
const cookieRouter = () => {
  // create a new router that we can customize
  const router = express.Router()

  router.get("/set", (req, res) => {
    res
      .cookie("userId", req.userId) // send a cookie in the response with the key 'foo' and value 'bar'
      .send({
        success: true,
        message: "Sent a cookie to the browser... hopefully it saved it.",
      })
  })

  // a route that looks for a Cookie header in the request and sends back whatever data was found in it.
  router.get("/", (req, res) => {
    console.log(`Incoming cookie data:`)
    console.log(`Incoming cookie data: ${req.cookies}`)
  })

  return router
}

// export the router
module.exports = cookieRouter
