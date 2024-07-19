const express = require("express");
const { getAllUsers, uploadProfilePicture, getUserById, updateUserProfile, deleteUserProfile } = require("../controllers/users");
const { imagesUploader } = require("../utils/imagesHandler")

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/upload-profile-photo", imagesUploader.single("profile_picture"), uploadProfilePicture);
router.patch("/:id", updateUserProfile);
router.delete("/:id", deleteUserProfile);

module.exports = router;