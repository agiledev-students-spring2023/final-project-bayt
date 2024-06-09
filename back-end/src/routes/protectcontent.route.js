const express = require("express");
const router = express.Router();
const passport = require("passport");
const protectcontent_controller = require('../controllers/protectcontent.controller.js');

router.get('/home', protectcontent_controller.getPage);
router.get('/alerts', protectcontent_controller.getPage);
router.get('/tasks', protectcontent_controller.getPage);
router.get('/profile', protectcontent_controller.getPage);
router.get('/settings', protectcontent_controller.getPage);
router.get('/finances', protectcontent_controller.getPage);
router.get('/addmembers', protectcontent_controller.getPage);

module.exports = router;
