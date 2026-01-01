const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const User = require('../models/User');
const mongoose = require('mongoose');

// Helper to slugify title
const createSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/(^-|-$)+/g, '');   // Remove leading/trailing hyphens
};

/**
 * @desc    Create new course
 * @route   POST /api/courses
 * @access  Private
 */
const createCourse = asyncHandler(async (req, res) => {
    const { title, videos, totalExampleDuration } = req.body;

    if (!title || !videos || videos.length === 0) {
        res.status(400);
        throw new Error('Please add a title and at least one video');
    }

    // Generate Slug
    let slug = createSlug(title);

    // Check for uniqueness (Global or Per User? Let's do Global for simple url sharing)
    // If collision, append timestamp
    const existingCourse = await Course.findOne({ slug });
    if (existingCourse) {
        slug = `${slug}-${Date.now()}`;
    }

    // Create the course
    const course = await Course.create({
        user: req.user.id,
        title,
        videos,
        totalExampleDuration,
        slug,
        isLocked: true
    });

    res.status(201).json(course);
});

/**
 * @desc    Get user courses
 * @route   GET /api/courses
 * @access  Private
 */
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({ user: req.user.id });
    res.status(200).json(courses);
});

/**
 * @desc    Get single course by ID or Slug
 * @route   GET /api/courses/:id
 * @access  Private
 */
const getCourse = asyncHandler(async (req, res) => {
    const param = req.params.id;
    let query = {};

    // Check if valid ObjectId
    if (mongoose.Types.ObjectId.isValid(param)) {
        query = { _id: param };
    } else {
        query = { slug: param }; // Assume it's a slug
    }

    const course = await Course.findOne(query);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Make sure user owns the course
    if (course.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    res.status(200).json(course);
});

/**
 * @desc    Update video status (Complete/Incomplete)
 * @route   PUT /api/courses/:id/videos/:videoId
 * @access  Private
 */
const updateVideoStatus = asyncHandler(async (req, res) => {
    // Logic reused from getCourse roughly, but we need the course to modify
    const param = req.params.id;
    let query = {};
    if (mongoose.Types.ObjectId.isValid(param)) {
        query = { _id: param };
    } else {
        query = { slug: param };
    }

    const course = await Course.findOne(query);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    if (course.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Find the video sub-document
    const video = course.videos.id(req.params.videoId);
    if (!video) {
        res.status(404);
        throw new Error('Video not found');
    }

    // Toggle status
    video.isCompleted = req.body.isCompleted;

    await course.save();

    res.status(200).json(course);
});

const YouTube = require("youtube-sr").default;

// ... (existing imports)

// ... (existing functions)

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    updateVideoStatus
};
