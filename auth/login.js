const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Please provide both username and password" });
  }

  try {
    const user = await User.findOne({ username: username });
    if (!user)
      return res
        .status(404)
        .send({ error: "Please create a user account first to login" });

    const passwordMatches = bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res.status(400).send({ error: "Invalid password" });

    const payload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      user_type: user.user_type,
    };

    const token = jwt.sign({ user: payload }, "1234", { expiresIn: "24h" });
    res.send({ token }).status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { login };
