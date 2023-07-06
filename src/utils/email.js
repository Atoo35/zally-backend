const nodemailer = require('nodemailer');
const { email } = require('../config');
// Using mailtrap.io for testing
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: email.port,
    auth: {
        user: email.username.trim().toString(),
        pass: email.password.trim().toString(),
    },
});

const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: 'test-zally@zally.io',
            to,
            subject,
            html,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(`Error sending email: ${error.message}`);
        throw error;
    }
};

module.exports = {
    sendEmail,
};
