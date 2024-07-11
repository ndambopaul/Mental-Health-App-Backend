const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

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

    const existingUserByUsername = await User.findOne({ username: data.username });
    if (existingUserByUsername)
        return res
        .status(400)
        .send({ error: `User with username: ${data.username} already exists!!` });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newUser = await User.create(data);
    if (!newUser)
      return res
        .status(400)
        .send({ error: "Something went wrong, user could not be created" });
    res.send(newUser).status(201)
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { register };
