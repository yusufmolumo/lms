import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection function
const connectDB = async () => {
    try {
        // Use the MongoDB Atlas connection string from .env
        const mongoURI = process.env.MONGO_URI;

        // Connection options for MongoDB Atlas
        const connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'SCLMP' // Specify the database name explicitly
        };

        // Connect to MongoDB Atlas
        await mongoose.connect(mongoURI, connectionOptions);

        console.log('✅ MongoDB Atlas connected successfully');
        console.log(`📦 Connected to database: SCLMP`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        
        // Exit process with failure
        process.exit(1);
    }
};

// Optional: Add event listeners for connection states
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to database');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from database');
});

export default connectDB;