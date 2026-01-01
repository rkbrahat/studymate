const express = require('express');
const router = express.Router();
const { createCourse, getCourses, getCourse, updateVideoStatus } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.route('/')
    .get(protect, getCourses)
    .post(protect, createCourse);

router.route('/:id')
    .get(protect, getCourse);

// Update specific video status
router.route('/:id/videos/:videoId')
    .put(protect, updateVideoStatus);

module.exports = router;
