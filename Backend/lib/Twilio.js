const dotenv = require('dotenv');
const twilio = require('twilio');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

dotenv.config();
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_MOB_NUM;
const client = twilio(accountSid, authToken);


const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const sendMobileOtp = catchAsyncErrors(async (otp, mobNum) => {

    try {

        if (typeof mobNum !== 'string' || !phoneRegex.test(mobNum)) {
            throw new Error("Invalid mobile number format");
        }

        await client.messages.create({
            body: `Welcome to Cuvette ,Your OTP is ${otp}.
            Note: Your otp will expire in 1 hr.`,
            from: twilioNumber,
            to: mobNum
        });
    }

    catch (error) {
        console.log(error)
    }
});

module.exports = { sendMobileOtp };
