const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./lib/db');
const cookieParser = require('cookie-parser');
const errorMilddleware = require('./middleware/Error.js')
const authRoutes = require('./routes/auth.routes.js');
const path = require('path');
const jobPostRoutes = require('./routes/jobPost.routes.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'https://job-portal-nu-kohl.vercel.app',
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

console.log("--------------------->", process.env.MONGODB_URI);
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobPostRoutes);


app.use(errorMilddleware)

app.use(express.static(path.join(__dirname, "./dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
    connectDB();
});

