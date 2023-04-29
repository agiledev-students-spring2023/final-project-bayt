const express = require("express");
const router = express.Router();
const home_controller = require("../controllers/home.controller.js");
const { roomDataValidationSchema } = require("../validations/rooms.validation.js");
const validate = require("../middleware/validation.middleware.js");

// Create routes and validate/sanitize data before passing to controller and make sure user is authenticated using passport
router.get("/", home_controller.getRooms);
router.post("/", roomDataValidationSchema, validate, home_controller.addRoom);


module.exports = router;