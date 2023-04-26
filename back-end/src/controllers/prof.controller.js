//const userData = require('../json/hardcode.json')
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const User = require('../models/users.model.js');
 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    const username = req.params.username; 
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const newFilename = `${timestamp}_${username}${extension}`;
    cb(null, newFilename);
  }
});

const upload = multer({ storage: storage});


//ideally we query with mongoose and pull object using ID
async function gets(req, res) {
  try {
    const username = req.params.username;
    const userData = await User.findOne({ username } ).populate('houses','name');

    // If no user is found, return a 404 error
    if (!userData) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const responseObject = { data: userData };

    // If the user has a profile picture, send it back as an image
    if (userData.profile_pic != 'Default.svg') {
      const imagePath = path.join(__dirname, '../uploads', userData.profile_pic);
      try {
        await fs.promises.access(imagePath, fs.constants.F_OK);
        const imageBuffer = await fs.promises.readFile(imagePath);
        responseObject.image = imageBuffer.toString('base64');
      } catch (error) {
        console.error(`File '${userData.profile_pic}' does not exist in the 'uploads' folder. Setting default profile now`);
        responseObject.data.profile_pic = 'Default.svg';
        await User.updateOne({ username}, { profile_pic: 'Default.svg' });
      }
    }

    res.json(responseObject);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
      message: 'Failed to retrieve data',
    });
  }
  };




  //handle user uploading files, updating db, removing previous file for user
  async function store(req,res){
        const username = req.params.username;
        const file = req.file;

        // Find the user by username
        const user = await User.findOne({ username });
          if (!user) {
            return res.status(404).json({
              error: 'User not found',
              status: 'failed to update data',
            });
          }

        // Get the current prof_pic filename for the user
        const currentFilename = user.profile_pic;
        
        // If the current filename is 'default', update the prof_pic field and save the new file to the uploads folder
        if (currentFilename === 'Default.svg') {
          user.profile_pic = file.filename;
          await user.save();
          return res.status(200).send('File uploaded successfully');
        }

        // If the current filename is not 'default', delete the old file from the uploads folder
        const oldFilePath = path.join(__dirname, '../uploads', currentFilename);
        fs.unlink(oldFilePath, async (unlinkErr) => {
          if (unlinkErr) {
            console.error(unlinkErr);
            return res.status(500).send(unlinkErr);
          }

          // Update the prof_pic field and save the new file to the uploads folder
          user.profile_pic = file.filename;
          await user.save();
          return res.status(200).send('File uploaded successfully');
        });
  };





  //change all this when we use database.  Will be a lot simpler.
  async function update(req, res) {
    try {
      const username = req.params.username;
      const updatedData = req.body;
      // Find the user by username
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
          status: 'failed to update data',
        });
      }

      // Update the existing data with the updated fields
      Object.assign(user, updatedData);

      // Update the user data in the MongoDB collection
      await User.updateOne({ username }, { $set: user });
      // Send a success response to the client-side application
      res.send(user);
    } 
    catch (err) {
      console.error(err);
      res.status(400).json({
        error: err,
        status: 'failed to update data',
        });
    }
};


  module.exports = {
    gets,
    update,
    store,
    upload
  };
