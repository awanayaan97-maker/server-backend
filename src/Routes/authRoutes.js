const express = require("express");
const router = express.Router();
const {signUp, login} = require("../Controllers/authController");

router.post("/signup", signUp);
router.post("/login", login)

module.exports = router