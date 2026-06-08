const express = require('express');
const router = express.Router();
const { 
  getCourses, 
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse,
  enrollCourse,
  getMyCourses,
  getInstructorCourses,
  checkEnrollment,
} = require('../controllers/courseController');
const { protect, instructor } = require('../middleware/auth');

router.get('/my-courses', protect, getMyCourses);
router.get('/instructor-courses', protect, instructor, getInstructorCourses);

router.route('/')
  .get(getCourses)
  .post(protect, instructor, createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(protect, instructor, updateCourse)
  .delete(protect, instructor, deleteCourse);

router.post('/:id/enroll', protect, enrollCourse);
router.get('/:id/enrollment-status', protect, checkEnrollment);

module.exports = router;
