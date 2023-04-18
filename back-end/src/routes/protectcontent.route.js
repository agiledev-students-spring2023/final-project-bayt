const express = require("express");
const router = express.Router();
const passport = require("passport");

// const protectcontent_controller = require('../controllers/protectcontent.controller.js');

router.get('/home', passport.authenticate("jwt", { session: false }), (req, res) => {
    // our jwt passport config will send error responses to unauthenticated users will
    // so we only need to worry about sending data to properly authenticated users!

    res.json({
      success: true,
      user: {
        id: req.user.id,
        username: req.user.username,
      },
      message:
        "Congratulations: you have accessed this route because you have a valid JWT token!",
    })
  });

module.exports = router;
