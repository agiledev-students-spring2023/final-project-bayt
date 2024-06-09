const mydata = require('../json/household_info.json');
const usersModel = require('../models/users.model');

// Get users in home and their info
async function gets(req, res) {
    try{
        const users = await usersModel.find({houses: req?.user.houses}).lean();
        res.status(200).json(users);
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
