// mongoose models for MongoDB data manipulation
const mongoose = require("mongoose")
const userModel = require("../models/users.model.js");
const houseModel = require("../models/house.model.js");

async function signup(req, res) {
    const houseName = req.body.houseName;
    const code = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;

    if (!houseName || !code || !username || !email || !role) {
        // incomplete info received in the POST body
        res.status(401).json({
          success: false,
          message: `Incomplete info supplied.`,
        });
    }

    try {
        const house = await new houseModel({ code: code, name: houseName }).save();

        try {
            const user = await new userModel({ username: username, first_name: "Set your first name", last_name: "Set your last name", email: email, password: code, role: role, profile_pic: "Default.svg", houses: house._id}).save();
            house.users.push(user);
            await house.save();

            // user saved successfully

            const token = user.generateJWT(); // generate a signed token
            res.json({
              success: true,
              message: "User saved successfully.",
              token: token,
              username: user.username,
            }); // send the token to the client to store
        } catch (err) {
            // error saving user to database
            console.log(`Failed to save user: ${err}`);
            res.status(500).json({
              success: false,
              message: "Error saving user to database.",
              error: err,
            });
        }

    } catch(err) {
        // error saving user to database
        console.log(`Failed to save house: ${err}`)
        res.status(500).json({
          success: false,
          message: "Error saving house to database.",
          error: err,
        });
    }
}

module.exports = {
    signup,
};