const express = require("express");
const userValidationSchema = require("../validators/UserValidationSchema");

const { register } = require("../auth/register");
const { login } = require("../auth/login");

const router = express.Router();
router.post("/register", userValidationSchema, register);
router.post("/login", login);

module.exports = router;
