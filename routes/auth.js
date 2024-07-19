const express = require("express");
const userValidationSchema = require("../validators/UserValidationSchema");

const { register } = require("../auth/register");
const { login } = require("../auth/login");
const { activateUser } = require("../auth/activate_user");
const { forgotPassword } = require("../auth/forgot_password");
const { resetPassword } = require("../auth/reset_password")

const router = express.Router();
router.post("/register", userValidationSchema, register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/activate-user/:token", activateUser);

module.exports = router;
