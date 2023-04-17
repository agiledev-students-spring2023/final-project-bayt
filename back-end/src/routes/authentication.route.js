const express = require("express")

// mongoose models for MongoDB data manipulation
const mongoose = require("mongoose")
const userModel = require("../models/users.model.js")

// a method that constains code to handle authentication-specific routes
const authenticationRouter = () => {
  // create a new router that we can customize
  const router = express.Router()

  // a route to handle user signup requests to /auth/signup
  router.post("/signup", async (req, res) => {
    // console.log(`Incoming signup data: ${JSON.stringify(req.body, null, 0)}`)
    // grab the username and password from the POST body
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
      // no username or password received in the POST body... send an error
      res.status(401).json({
        success: false,
        message: `No username or password supplied.`,
      })
    }

    // try to create a new user
    try {
      const user = await new User({ username, password }).save()
      // user saved successfully... send a success response
      console.error(`New user: ${user}`)
      const token = user.generateJWT() // generate a signed token
      res.json({
        success: true,
        message: "User saved successfully.",
        token: token,
        username: user.username,
      }) // send the token to the client to store
    } catch (err) {
      // error saving user to database... send an error response
      console.error(`Failed to save user: ${err}`)
      res.status(500).json({
        success: false,
        message: "Error saving user to database.",
        error: err,
      })
    }
  })

  // a route to handle login attempts requested to /auth/login
  router.post("/login", async function (req, res) {
    // brab the name and password that were submitted as POST body data
    const username = req.body.username
    const password = req.body.password
    // console.log(`${username}, ${password}`)

    if (!username || !password) {
      // no username or password received in the POST body... send an error
      res
        .status(401)
        .json({ success: false, message: `No username or password supplied.` })
    }

    // find this user in the database
    try {
      const user = await User.findOne({ username: username }).exec()
      // check if user was found
      if (!user) {
        console.error(`User not found.`)
        return res.status(401).json({
          success: false,
          message: "User not found in database.",
        })
      }
      // if user exists, check if password is correct
      else if (!user.validPassword(password)) {
        console.error(`Incorrect password.`)
        return res.status(401).json({
          success: false,
          message: "Incorrect password.",
        })
      }
      // user found and password is correct... send a success response
      console.log("User logged in successfully.")
      const token = user.generateJWT() // generate a signed token
      res.json({
        success: true,
        message: "User logged in successfully.",
        token: token,
        username: user.username,
      }) // send the token to the client to store
    } catch (err) {
      // check error
      console.error(`Error looking up user: ${err}`)
      return res.status(500).json({
        success: false,
        message: "Error looking up user in database.",
        error: err,
      })
    }
  })

  // a route to handle logging out requests to /auth/logout
  router.get("/logout", function (req, res) {
    // nothing really to do here... logging out with JWT authentication is handled entirely by the front-end by deleting the token from the browser's memory
    res.json({
      success: true,
      message:
        "There is actually nothing to do on the server side... you simply need to delete your token from the browser's local storage!",
    })
  })

  return router
}

// export the router
module.exports = authenticationRouter
