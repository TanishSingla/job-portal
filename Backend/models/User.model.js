const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    mobile: {
        type: String,
        required: [true, "Please provide a valid mobile number."]
    },
    companyName: {
        type: String,
        required: [true, 'Please enter your company name.']
    },
    companyEmail: {
        type: String,
        required: [true, "Please enter valid email id"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    employeeSize: {
        type: Number,
        required: [true, 'Please enter employee size']
    },
    isMobileVerified: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    verificationEmailToken: String,
    verificationEmailExpire: Date,
    verificationMobileToken: {
        type: String
    },
    verificationMobileExpire: Date
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User; 