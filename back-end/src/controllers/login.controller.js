const mongoose = require("mongoose");
const userModel = require("../models/users.model.js");

async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(401).json({ success: false, message: `No username or password supplied.` });
    }

    try {
        const user = await userModel.findOne({ username: username }).exec();
        // check if user was found
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User not found.",
          });
        }
        // if user exists, check if password is correct
        else if (!user.validPassword(password)) {
          return res.status(401).json({
            success: false,
            message: "Incorrect password.",
          });
        }
        // user found and password is correct... send a success response
        const token = user.generateJWT(); // generate a signed token
        res.json({
          success: true,
          message: "User logged in successfully.",
          token: token,
          username: user.username,
        }); // send the token to the client to store
    } catch (err) {
        // check error
        console.log(`Error looking up user: ${err}`);
        return res.status(500).json({
          success: false,
          message: "Error looking up user in database.",
          error: err,
        });
    }
}

module.exports = {
    login,
};