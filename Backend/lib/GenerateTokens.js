const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "1d"
    });
    return token;
};


const setCookies = (resp, token) => {
    resp.cookie("token", token, {
        httpOnly: true, // prevent XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // prevent CSRF attacks
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    });
};

const generateEmailVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const generateMobileVerificationOtp = () => Math.floor(1000 + Math.random() * 9000).toString();


module.exports = { generateToken, setCookies, generateEmailVerificationCode, generateMobileVerificationOtp };