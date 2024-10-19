const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail service
    auth: {
        user: "mayatan.dev@gmail.com", // Your Gmail address
        pass: "hplkcoqcznyghtci", // Use an App Password if 2FA is enabled
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(from,to, subject, text, html) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });

    console.log("Message sent: %s", info.messageId);
};

module.exports = { sendMail };
