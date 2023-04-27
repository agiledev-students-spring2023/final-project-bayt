const fs = require('fs');
const multer = require('multer');
const path = require('path'); 
const userModel = require("../models/users.model.js");
const houseModel = require("../models/house.model.js");


//This works for now but ideally when we have database and start a session for a user I need to access the logged in user info
//in order to place the new added user in the same household as the user who invited them

async function savingUser(req,res, err) {
  console.log(req.body)
  loggedusername = req.params.username; 
  console.log(loggedusername)
  const {username, email, password, file} = req.body;
    const newUser = {
        username: username,
        email: email,
        password: password,
        profile_pic: 'Default.svg'
      };
      
  try {
      const loggeduser = await userModel.findOne({ username: loggedusername }).populate('houses').exec();
      // if user exists, check if password is correct
      if (!loggeduser.validPassword(password)) {
        res.status(401).json({
          success: false,
          message: "Incorrect housecode",
        });

      } else {
        if (file) {
          const {base64, filename} = file;
          const buffer = Buffer.from(base64, "base64");
          const timestamp = Date.now();
          const extension = path.extname(filename);
          const pathy = path.join(__dirname, '../uploads');
          const newFilename = `${pathy}/${timestamp}_${username}${extension}`;
          const dbName = `${timestamp}_${username}${extension}`;
          fs.writeFileSync(newFilename, buffer);
          newUser.profile_pic = dbName;
        }    
        const addUser = await new userModel({ username: username, first_name: "Set your first name", last_name: "Set your last name", email: email, password: password, role: 'roomate', profile_pic: newUser.profile_pic, houses:loggeduser.houses }).save();
        for (const house of loggeduser.houses) {
          house.users.push(addUser);
          await house.save();
        }
         res.status(200).json({
          success: true,
          message: "Good job diana."
        });
      }
    } catch (err) {
      // error saving user to database
      console.log(`Failed to save user: ${err}`);
      res.status(500).json({
        success: false,
        message: "Error saving user to database.",
        error: err
      });
  }
}

module.exports = {
    savingUser
  };