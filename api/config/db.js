const mongoose = require('mongoose');

/**
 * connectDB
 * 
 * Establishes connection to the MongoDB database.
 * Handles both local and cloud connection strings transparently.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Colors used: 
        // Cyan underline for the host to make it clickable/distinct
        // Yellow for the database name for visibility
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        console.log(`Database Name: ${conn.connection.name}`.yellow);

    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(1);
    }
};

module.exports = connectDB;
