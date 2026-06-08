const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const Lesson = require('./models/Lesson');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedLessons = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/online-course-platform');
    console.log('MongoDB Connected');

    const courses = await Course.find({});
    
    if (courses.length === 0) {
      console.log('No courses found! Please run seed.js first.');
      process.exit(1);
    }

    console.log('Clearing old lessons...');
    await Lesson.deleteMany({});

    const dummyLessons = [];

  
    for (const course of courses) {
      dummyLessons.push({
        title: 'Introduction to ' + course.title,
        content: `Welcome to ${course.title}. In this lesson, we will cover the basics and what you can expect to learn.`,
        course: course._id
      });
      dummyLessons.push({
        title: 'Core Concepts',
        content: `This lesson dives deep into the core concepts of the subject. You will learn the fundamental principles that make this work.`,
        course: course._id
      });
      dummyLessons.push({
        title: 'Advanced Techniques',
        content: `Now that you know the basics, let's explore some advanced techniques and best practices to master this topic.`,
        course: course._id
      });
    }

    await Lesson.insertMany(dummyLessons);
    console.log(`Successfully seeded ${dummyLessons.length} dummy lessons across ${courses.length} courses!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding lessons:', error);
    process.exit(1);
  }
};

seedLessons();
