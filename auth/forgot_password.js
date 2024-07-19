const crypto = require('crypto');
const User = require("../models/users");

const { sendEmail } = require("../mailer/email_sender");

const forgotPassword = async(req, res) => {
    const { email } = req.body

    if(!email) return res.status(400).send({ error: "Please provide your email" })

    try {
        const user = await User.findOne({"email": email})

        if(!user) return res.send({"error": `User with email: ${email} not found!!`}).status(404)

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        const emailSubject = 'Password Reset Link'
        const emailMessage = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
              + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
              + `http://${req.headers.host}/api/v0/auth/reset-password/${resetToken}\n\n`
              + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
          
      
        await sendEmail(emailSubject, emailMessage, email)

        res.send({message: "Email send successfully!!"}).status(200)

    } catch (error) {
        console.log(error);
        return res.send({"error": `${error.message}`}).status(500)
    }
}


module.exports = {
    forgotPassword
}