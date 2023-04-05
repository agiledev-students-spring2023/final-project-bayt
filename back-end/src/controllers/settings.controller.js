const mydata = require('../utils/household_info.json');

async function gets(req, res) {
    try{
        res.json(mydata)
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
