const fs = require('fs');
const path = require('path'); 
const userModel = require("../models/users.model.js");
const houseModel = require("../models/house.model.js");


async function savingUser(req,res, err) {
  const {username, email, password, file} = req.body;
 
  let profile_pic = 'Default.svg';
  
  try {
    const loggeduser = await User.findById(req.user._id).populate('houses').exec();

    if (!loggeduser.validPassword(password)) {
        res.status(401).json({
        success: false,
        message: "Incorrect housecode",
        });

    } else {
        console.log(loggeduser)
        // if user exists, check if password is correct
        if (file) {
          const {base64, filename} = file;
          const buffer = Buffer.from(base64, "base64");
          const timestamp = Date.now();
          const extension = path.extname(filename);
          const pathy = path.join(__dirname, '../uploads');
          const newFilename = `${pathy}/${timestamp}_${username}${extension}`;
          const dbName = `${timestamp}_${username}${extension}`;
          fs.writeFileSync(newFilename, buffer);
          profile_pic = dbName;
        }

        console.log(loggeduser.houses)
        const addUser = await new userModel({ username: username, first_name: "Set your first name", last_name: "Set your last name", email: email, password:password, role: "roomate", profile_pic: profile_pic, houses:loggeduser.houses });
        addUser.save();
        loggeduser.houses.users.push(addUser);
        await loggeduser.houses.save()
    
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

  /*
  fs.readFile(require.resolve('../json/household_info.json'), (err, data) => {
           if (err) throw err;
           console.log('err',err)
      
           const users = JSON.parse(data);
           users.push(newUser);
      
           fs.writeFile(require.resolve('../json/household_info.json'), JSON.stringify(users, null, 2), err => {
             if (err) throw err;
             console.log('err',err)
           });
         });
}*/


}
module.exports = {
    savingUser
  };
