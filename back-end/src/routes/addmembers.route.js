const express = require("express");
const router = express.Router();
const addMembers_controller = require("../controllers/addmembers.controller.js");

const {addMembersDataValidationSchema} = require("../validations/addMembers.validation.js");
const validate = require("../middleware/validation.middleware.js");

router.post("/",addMembersDataValidationSchema, validate, addMembers_controller.saveUser);

module.exports = router;
