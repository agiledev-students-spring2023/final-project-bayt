const addMembersService = require("../services/addmembers.services.js");


async function saveUser(req,res){
    try {
        const saved = await addMembersService.savingUser(req,res);
        res.status(200).json(saved);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }


module.exports = {
    saveUser 
  };