const mongoose = require('mongoose');

/**
 * Video Sub-Schema
 * 
 * Represents a single video unit within a course.
 * Not a standalone model, but embedded within the Course schema.
 */
const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    duration: {
        type: String, // String for now (e.g., "10:30"), can be parsed to seconds later
        default: "00:00"
    },
    youtubeId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['video', 'playlist'],
        default: 'video'
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

/**
 * Course Schema
 * 
 * Represents a user-created learning path/protocol.
 * - user: Reference to the creator.
 * - videos: Array of embedded video objects.
 * - isLocked: Enforces the "Immutable" rule.
 */
const courseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a course title']
    },
    videos: [videoSchema],
    isLocked: {
        type: Boolean,
        default: true, // By default, courses are locked/immutable upon creation
        required: true
    },
    totalExampleDuration: {
        type: String,
        default: "0m"
    },
    slug: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// Pre-validate hook to generate slug if missing (Backward Compatibility)
courseSchema.pre('validate', function () {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        // Append random string to ensure uniqueness for old courses being migrated on the fly
        if (!this.isNew) {
            this.slug = `${this.slug}-${Math.floor(Math.random() * 10000)}`;
        }
    }
});

module.exports = mongoose.model('Course', courseSchema);
