const express = require("express");
const { sendMail, createJobPost, allJobs, jobPostedByMe } = require("../controllers/jobPost.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/sendMail", isAuthenticated, sendMail);
router.post("/jobPost", isAuthenticated, createJobPost);
router.get("/users/me", isAuthenticated, jobPostedByMe);
// router.delete('/users/me', isAuthenticated);
router.get("/", allJobs);


module.exports = router;
