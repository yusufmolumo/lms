const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const colors = require('colors');

// Error Handling Middleware
const globalErrorHandler = require('./middleware/errorMiddleware');
const AppError = require('./utils/appError');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Create Express App
const app = express();

// Enable Colors for Console
colors.enable();

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

// Rate Limiting
const limiter = rateLimit({
    max: 1000, // 1000 requests
    windowMs: 60 * 60 * 1000, // 1 hour window
    message: 'Too many requests from this IP, please try again in an hour'
});

// Middleware
app.use(cors(corsOptions));
app.use(helmet()); // Secure HTTP headers
app.use(limiter); // Rate limiting middleware
app.use(compression()); // Compress responses
app.use(express.json({ limit: '10kb' })); // Body parser
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); // Parse cookies
app.use(morgan('dev')); // Logging middleware

// Static File Serving
app.use(express.static('public'));

// Health Check Route
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'SCLMP Learning Management System is up and running!',
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/teacher', teacherRoutes);
app.use('/api/v1/student', studentRoutes);

// Unhandled Route Handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;