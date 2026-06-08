const express = require('express');
const router = express.Router();
const { getCommentsByLesson, addComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.get('/lesson/:lessonId', protect, getCommentsByLesson);
router.post('/lesson/:lessonId', protect, addComment);

module.exports = router;
