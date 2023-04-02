const info = require('../HardCode.json')
const fs = require('fs');

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
    // Extract the updated data from the request body
    const updatedData = req.body;

    // Update the existing data with the updated fields
    Object.keys(updatedData).forEach((key) => {
        data[key] = updatedData[key];
    });

    // Write the updated data back to the JSON file
    fs.writeFileSync(require.resolve('../HardCode.json'), JSON.stringify(data));

    // Send a success response to the client-side application
    res.send(data);
  };



  module.exports = {
    gets,
    update
  };
