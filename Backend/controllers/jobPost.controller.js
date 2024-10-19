const ErrorHandler = require("../lib/errorHandler");
const { sendMail } = require("../lib/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const JobPosting = require("../models/JobPosting.model");

// Function to generate HTML content for job posting email
const generateJobPostEmail = (jobTitle, jobDescription, jobType, endDate) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="text-align: center; color: #0056b3;">Exciting Job Opportunity: ${jobTitle}</h2>
                
                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">
                
                <p style="font-size: 16px; line-height: 1.6; color: #555;">
                    <strong>Job Description:</strong><br>
                    ${jobDescription}
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; color: #555;">
                    <strong>Job Type:</strong><br>
                    ${jobType}
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; color: #555;">
                    <strong>Application Deadline:</strong><br>
                    ${new Date(endDate).toLocaleDateString()}
                </p>

                <p style="font-size: 16px; line-height: 1.6; color: #555; text-align: center;">
                    We are excited to see your application!
                </p>

                <p style="text-align: center;">
                    <a href="#" style="background-color: #28a745; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 16px; display: inline-block;">
                        Apply Now
                    </a>
                </p>

                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">

                <p style="font-size: 14px; line-height: 1.4; color: #777;">
                    If you have any questions, feel free to reply to this email. We wish you the best of luck in your job search!
                </p>
                
                <p style="font-size: 14px; color: #999; text-align: center;">
                    Best regards,<br>
                    The Hiring Team
                </p>
            </div>
        </div>
    `;
};

exports.sendMail = catchAsyncErrors(async (req, resp, next) => {
    const { jobTitle, jobDescription, jobType, candidates, endDate } = req.body;

    // console.log("---->", req.body);

    // Validate input fields
    if (!jobTitle || !jobDescription || !jobType || !candidates || !endDate) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    const userId = req?.user?._id;

    // Generate the email content using the helper function
    const emailContent = generateJobPostEmail(jobTitle, jobDescription, jobType, endDate);
    const mailSubject = "New Job Opening - Hurry-Up";

    // Send email to all candidates
    candidates.forEach(async (candidateEmail) => {
        try {
            sendMail(
                `${req.user?.name} <mayatan.dev@gmail.com>`,
                candidateEmail,
                mailSubject,
                `New Job Posting: ${jobTitle}`,
                emailContent
            );
        } catch (error) {
            console.error(`Error sending email to ${candidateEmail}:`, error);
        }
    });

    resp.status(200).json({
        success: true,
        message: "Job posting created successfully",
        post
    });
});


//create job post
exports.createJobPost = catchAsyncErrors(async (req, resp, next) => {
    const { jobId, jobTitle, jobDescription, jobType, endDate, company } = req.body;

    console.log(req.body);

    // Validate input fields
    if (!jobId || !jobTitle || !jobDescription || !jobType || !endDate || !company) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    const userId = req?.user?._id;

    //will check if with the given job id ,job alrady exists
    const jobExists = await JobPosting.findOne({ jobId });
    if (jobExists) {
        return next(new ErrorHandler("Job already exists", 400));
    }

    // Create new job posting
    const post = await JobPosting.create({
        jobId,
        jobTitle,
        jobDescription,
        jobType,
        endDate,
        company,
        createdBy: userId
    });

    resp.status(200).json({
        success: true,
        message: "Job posting created successfully",
        post
    });
});

exports.jobPostedByMe = catchAsyncErrors(async (req, resp, next) => {
    const userId = req?.user?._id;
    const jobs = await JobPosting.find({ createdBy: userId });
    resp.status(200).json({
        success: true,
        jobs
    });
});

exports.deleteJobPost = catchAsyncErrors(async (req, resp, next) => {
    const userId = req?.user?._id;
    const jobId = req.body.jobId;
    const result = await JobPosting.deleteOne({ jobId, createdBy: userId });
    resp.status(200).json({
        success: true,
        result,
        message: `job with ${id} deleted successfully`
    });
});


exports.allJobs = catchAsyncErrors(async (req, resp, next) => {
    const allJobs = await JobPosting.find();
    resp.status(200).json({
        success: true,
        jobPosts: allJobs
    });
});