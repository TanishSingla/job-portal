const mongoose = require("mongoose");
const User = require("./User.model");

const jobPostingSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: [true, "Job id is required"],
        unique: true
    },
    jobTitle: {
        type: String,
        required: [true, "Job title is required"]
    },
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },

    jobType: {
        type: String,
        required: [true, "Job type is required"],
    },
    company: {
        type: String,
        required: [true, "Company name is required"]
    },
    endDate: {
        type: Date,
        required: [true, "Please provide end date of job posting."]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);
module.exports = JobPosting; 