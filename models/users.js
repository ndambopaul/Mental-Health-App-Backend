const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    phone_number: String,
    password: String,
    user_type: {
        type: String,
        enum: ["Admin", "Physician", "Client"]
    },
    dob: Date,
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    address: String,
    bio: String,
    profile_picture: String,
    account_status: {
        type: String,
        enum: ["Active", "Disabled", "Pending Review"],
        default: "Active"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);