const express = require("express");
const { registerUser, verifyEmail, verifymobile, userProfile, logout } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/verifyEmail", verifyEmail);
router.post("/verifyMobile", verifymobile);
router.get("/profile", isAuthenticated, userProfile);
router.get('/logout', logout);



module.exports = router;

