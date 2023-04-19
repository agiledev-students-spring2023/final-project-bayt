const userData = require('../json/hardcode.json')
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const User = require('../models/users.model.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
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
    res.json(userData);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
      message: 'Failed to retrieve data',
    });
  }
  };

  //handle user uploading files
  async function store(req,res){
    // Check if there are any existing files in the uploads folder
    const uploadDir = path.join(__dirname, '../uploads');
    const files = fs.readdirSync(uploadDir);
    if (files.length > 0) {
        // Delete all existing files
        for (const file of files) {
            fs.unlinkSync(path.join(uploadDir, file));
        }
    }

    // Handle file upload with Multer
    upload.single('file')(req, res, function(err) {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
  })
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
    store
  };
