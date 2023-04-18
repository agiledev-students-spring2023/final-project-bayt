const express = require("express");
const router = express.Router();
const passport = require("passport");

const protectcontent_controller = require('../controllers/protectcontent.controller.js');

router.get('/home', passport.authenticate("jwt", { session: false }), protectcontent_controller.getPage);
router.get('/alerts', passport.authenticate("jwt", { session: false }), protectcontent_controller.getPage);
router.get('/tasks', passport.authenticate("jwt", { session: false }), protectcontent_controller.getPage);
router.get('/profile', passport.authenticate("jwt", { session: false }), protectcontent_controller.getPage);
router.get('/settings', passport.authenticate("jwt", { session: false }), protectcontent_controller.getPage);
router.get('/finances', passport.authenticate("jwt", { session: false }), protectcontent_controller.getPage);
router.get('/addmembers', passport.authenticate("jwt", { session: false }), protectcontent_controller.getPage);

module.exports = router;
