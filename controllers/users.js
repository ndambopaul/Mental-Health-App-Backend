const User = require("../models/users");

const getAllUsers = async(req, res) => {
    const users = await User.find({}).select("-password")

    res.send({ count: users.length, users: users }).status(200)
}

// Remaining Controllers

//1. Getting user by id.
const getUserById = async(req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id).select("-password")
        if(!user) return res.status(404).send({ error: `User with id: ${id} not found!!!` })

        res.send(user).status(200)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message })
    }
}
//2. Updating User Profile.

const updateUserProfile = async(req, res) => {
    const data = req.body

    try {
        const user = await User.findByIdAndUpdate(req.user.id, {...data}, { new: true })
        if(!user) return res.status(404).send({ error: `User with id: ${id} not found!!` })

        res.send({ message: "User successfully updated!!" }).status(200)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message })
    }
}
//3. Uploading User Profile image.
const uploadProfilePicture = async(req, res) => {
    const image = req.file.filename;

    try {
        const user = await User.findById({ "_id": req.user.id });
        if(!user) return res.status(404).send({ error: "User not found!!" });

        user.profile_picture = image
        await user.save()

        return res.status(200).send({ message: "User profile photo uploaded successfully!!" })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message })
    }
    
}
//4. Deleting User Profile.
const deleteUserProfile = async(req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndDelete(id)
        if(!user) return res.status(404).send({ error: `User with id: ${id} not found!!` })
        res.send({ message: "User deleted successfully!!" }).status(200)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message })
    }

}

module.exports = { getAllUsers, uploadProfilePicture, getUserById, updateUserProfile, deleteUserProfile }