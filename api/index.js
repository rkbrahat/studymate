const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables (Must be called before connectDB)
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express App
const app = express();

// --- Middleware ---
// CORS: Allows cross-origin requests from our React frontend (port 5173 usually)
// CORS: Allows cross-origin requests
app.use(cors({
    origin: '*', // Allow requests from any origin (e.g., Vercel frontend)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Body Parser: Allows us to parse JSON data sent in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { errorHandler } = require('./middleware/errorMiddleware');

// --- Routes ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));

app.use(errorHandler);

// Defining the port
const PORT = process.env.PORT || 5000;

// Start the server
// Start the server (Only if not in production/vercel environment, OR strictly if we want local dev)
// Vercel requires exporting the app, not listening on a port.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`.yellow.bold);
    });
}

module.exports = app;
