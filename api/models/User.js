const mongoose = require('mongoose');

/**
 * User Schema
 * 
 * Defines the structure for user accounts.
 * - name: Display name.
 * - email: Unique identifier for login.
 * - password: Hashed password string.
 */
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
