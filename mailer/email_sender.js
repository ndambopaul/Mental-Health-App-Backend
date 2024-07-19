const transporter = require("./transporter")

const sendEmail = async(subject, message, email) => {

    // Sending User Activation Email
    const mailOptions = {
        from: 'paulgomycode@gmail.com',
        to: email,
        subject: subject,
        text: message
      };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail }