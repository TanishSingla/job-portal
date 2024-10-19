const User = require("../models/User.model");
const ErrorHandler = require("../lib/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const { generateToken, generateEmailVerificationCode, generateMobileVerificationOtp, setCookies } = require("../lib/GenerateTokens");
const { sendMail } = require("../lib/sendMail");
const { sendMobileOtp } = require("../lib/Twilio");




// Function to generate HTML for the verification email
const generateMailHtml = (name, emailToken) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
            <h2 style="color: #333;">Welcome to Cuvette, ${name}!</h2>
            <p style="color: #555;">Thank you for registering with us. Please verify your email address to get started.</p>
            <p style="color: #555;">Here is your verification code:</p>
            <h2 style="color: blue;">${emailToken}</h2>
            <p style="color: #555;">This code will expire in 1 hour.</p>
            <p style="color: #555;">If you did not request this email, please ignore it.</p>
            <p style="color: #555;">Best Regards,<br />The Cuvette Team</p>
            </div>`;
};

//Register a User 
exports.registerUser = catchAsyncError(async (req, resp, next) => {
    const { name, mobile, companyName, companyEmail, employeeSize } = req.body;

    console.log(req.body);
    // Validate request body
    if (!name || !mobile || !companyName || !companyEmail || !employeeSize) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    // Check if user already exists
    let user = await User.findOne({ companyEmail });

    // Handle already verified users
    if (user && user.isMobileVerified && user.isEmailVerified) {
        return next(new ErrorHandler("User already exists and is verified", 400));
    }

    const emailToken = generateEmailVerificationCode();
    const otpForMobile = generateMobileVerificationOtp();
    const expirationTime = Date.now() + 1 * 60 * 60 * 1000;


    if (!user) {
        user = await User.create({
            name,
            mobile,
            companyName,
            companyEmail,
            employeeSize,
            verificationEmailToken: emailToken,
            verificationEmailExpire: expirationTime,
            verificationMobileToken: otpForMobile,
            verificationMobileExpire: expirationTime,
        });
    } else {
        // Update existing user's verification tokens and expiration
        Object.assign(user, {
            verificationEmailToken: emailToken,
            verificationEmailExpire: expirationTime,
            verificationMobileToken: otpForMobile,
            verificationMobileExpire: expirationTime,
        });
        await user.save();
    }

    const token = generateToken(user._id);
    setCookies(resp, token);

    const mailSubject = "Welcome to Cuvette - Verify Your Email";
    const mailHtml = generateMailHtml(name, emailToken); // Generate HTML content

    // Send verification email and mobile OTP
    sendMail(
        '"Cuvette" <mayatan.dev@gmail.com>',
        companyEmail,
        mailSubject,
        `Your verification code is: ${emailToken}. This code will expire in 1 hour.`,
        mailHtml
    );

    sendMobileOtp(otpForMobile, mobile);

    resp.status(201).json({
        message: "User created successfully",
        success: true,
        user: {
            name,
            mobile,
            companyName,
            companyEmail,
            employeeSize,
            id: user._id,
        },
    });
});



// verify email
exports.verifyEmail = catchAsyncError(async (req, resp, next) => {

    const id = req.body.id;
    if (!id) {
        return next(new ErrorHandler("Invalid request", 400));
    }
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("Register first to verify the email", 404));
    }
    //   Check if the email verification token matches the one sent in the request
    const { emailToken } = req.body;

    if (user?.verificationEmailToken !== emailToken) {
        return next(new ErrorHandler("Invalid email verification token", 400));
    }

    // Checking if the email verification token is expired
    if (user?.verificationEmailExpire < Date.now()) {
        return next(new ErrorHandler("Email verification token has expired", 400));
    }

    //  Mark the email as verified
    user.isEmailVerified = true;
    user.verificationEmailToken = undefined;
    user.verificationEmailExpire = undefined;
    await user.save();

    //  Respond with success
    resp.status(200).json({
        message: "Email verified successfully!",
        success: true,
    });
});



//verify mobile otp

exports.verifymobile = catchAsyncError(async (req, resp, next) => {

    const id = req.body.id;
    if (!id) {
        return next(new ErrorHandler("Invalid request", 400));
    }
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("Register first to verify the email", 404));
    }
    //   Check if the email verification token matches the one sent in the request
    const { mobileToken } = req.body;

    if (user?.verificationMobileToken !== mobileToken) {
        return next(new ErrorHandler("Invalid mobile verification token", 400));
    }

    // Checking if the email verification token is expired
    if (user?.verificationMobileExpire < Date.now()) {
        return next(new ErrorHandler("Mobile verification token has expired", 400));
    }

    //  Mark the mobile as verified
    user.isMobileVerified = true;
    user.verificationMobileToken = undefined;
    user.verificationMobileExpire = undefined;
    await user.save();

    //  Respond with success
    resp.status(200).json({
        message: "Mobile verified successfully!",
        success: true,
    });
});


//user profile
exports.userProfile = catchAsyncError(async (req, resp, next) => {
    resp.status(200).json({
        success: true,
        user: req.user,
    });
});


exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

