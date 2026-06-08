const express = require('express');
const router = express.Router({ mergeParams: true });
const { getLessonsByCourse, getLessonById, createLesson } = require('../controllers/lessonController');
const { protect, instructor } = require('../middleware/auth');

// Lessons for a course - public read, protected write
router.get('/course/:courseId', getLessonsByCourse);
router.post('/course/:courseId', protect, instructor, createLesson);

router.get('/:id', protect, getLessonById);

module.exports = router;
