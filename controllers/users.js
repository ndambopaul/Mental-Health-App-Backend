const User = require("../models/users");

const getAllUsers = async(req, res) => {
    const users = await User.find({}).select("-password")

    res.send({ count: users.length, users: users }).status(200)
}

// Remaining Controllers

//1. Getting user by id.
//2. Updating User Profile.
//3. Uploading User Profile image.
//4. Deleting User Profile.

module.exports = { getAllUsers }