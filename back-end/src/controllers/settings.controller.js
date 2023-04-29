const mydata = require('../json/household_info.json');
const usersModel = require('../models/users.model');

// Get users in home and their info
async function gets(req, res) {
    try{
        return await usersModel.find({houses: req?.user.houses});
      }
      catch (err) {
        console.error(err)
        res.status(400).json({
          error: err,
          status: 'failed to retrieve data',
        })
      }
  };


  module.exports = {
    gets
  };
