const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const { sendEmail } = require("../mailer/email_sender");

const User = require("../models/users");

const register = async (req, res) => {
  const data = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUserByEmail = await User.findOne({ email: data.email });
    if (existingUserByEmail)
      return res
        .status(400)
        .send({ error: `User with email: ${data.email} already exists!!` });

    const existingUserByUsername = await User.findOne({
      username: data.username,
    });
    if (existingUserByUsername)
      return res
        .status(400)
        .send({
          error: `User with username: ${data.username} already exists!!`,
        });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newUser = await User.create(data);
    if (!newUser)
      return res
        .status(400)
        .send({ error: "Something went wrong, user could not be created" });

    const activationToken = crypto.randomBytes(20).toString('hex');
    newUser.activationToken = activationToken;
    newUser.activationTokenExpires = Date.now() + 3600000; // Token expires in 1 hour
    await newUser.save();

    // Sending User Activation Email
    const emailMessage = `You are receiving this email email because you created an account on Cloud Store.\n\n`
              + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
              + `http://${req.headers.host}/api/v0/auth/activate-user/${activationToken}\n\n`
              + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    const emailSubject = "User Activation"


    await sendEmail(emailSubject, emailMessage, data.email)

    res.send(newUser).status(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { register };
