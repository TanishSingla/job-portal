const jwt = require("jsonwebtoken");
const User = require('../models/User.model');
const catchAsyncError = require('./catchAsyncErrors');
const ErrorHandler = require('../lib/errorHandler')

const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource"), 401);
    }
    const decodedData = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    const user = await User.findById(decodedData.userId);

    if (user.isEmailVerified === false || user.isMobileVerified === false) {
        return next(new ErrorHandler("Please verify your email and mobile first", 401));
    }
    req.user = user;
    next();
});

module.exports = { isAuthenticated };