const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config/.env' });

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        console.log('MongoDB Connection Successfully Established ✅'.green);
    } catch (error) {
        console.error('MongoDB Connection Failed ❌'.red, error.message);
        // Exit process with failure
        process.exit(1);
    }
};

// Connect to Database
connectDB();

// Define Port
const PORT = process.env.PORT || 5000;

// Graceful Shutdown
const gracefulShutdown = () => {
    console.log('Received kill signal, shutting down gracefully');
    
    // Close server & database connections
    app.close(() => {
        console.log('Closed out remaining connections');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });

    // If connections don't close in 10 seconds, forcefully shut down
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

// Start Server
const server = app.listen(PORT, () => {
    console.log(`SCLMP Server Running on Port ${PORT} 🚀`.green);
    console.log(`Environment: ${process.env.NODE_ENV}`.blue);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    server.close(() => process.exit(1));
});

// Handle SIGTERM and SIGINT signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = server;