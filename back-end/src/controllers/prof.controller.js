const info = require('../utils/hardcode.json')
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });


//change all this shit once we implement database.
//ideally we query with mongoose and pull object using ID
async function gets(req, res) {
    try{
        res.json(info)
      }
      catch (err) {
        console.error(err)
        res.status(400).json({
          error: err,
          status: 'failed to retrieve data',
        })
      }
  };

  //change all this when we use database.  Will be a lot simpler.
  async function update(req, res) {
    let data = JSON.parse(fs.readFileSync(require.resolve('../HardCode.json')));
    const updatedData = req.body;

    // Check if there are any existing files in the uploads folder
    const uploadDir = path.join(__dirname, '../uploads');
    const files = fs.readdirSync(uploadDir);
    if (files.length > 0) {
        // Delete all existing files
        for (const file of files) {
            fs.unlinkSync(path.join(uploadDir, file));
        }
        
        console.log('Existing files deleted successfully.');
    }

    // Handle file upload with Multer
    upload.single('file')(req, res, function(err) {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        
        console.log('File uploaded successfully.');
    
        // Update the existing data with the updated fields
        Object.keys(updatedData).forEach((key) => {
          data[key] = updatedData[key];
        });
    
        // Write the updated data back to the JSON file
        fs.writeFileSync(require.resolve('../HardCode.json'), JSON.stringify(data));
    
        // Send a success response to the client-side application
        res.send(data);
      });

  };


  module.exports = {
    gets,
    update
  };
