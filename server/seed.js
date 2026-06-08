const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const User = require('./models/User');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/online-course-platform');
    console.log('MongoDB Connected');

    let instructor = await User.findOne({ role: 'instructor' });

    if (!instructor) {
      console.log('No instructor found. Creating a dummy instructor...');
      instructor = new User({
        name: 'Demo Instructor',
        email: 'instructor@example.com',
        password: 'password123',
        role: 'instructor'
      });
      await instructor.save();
    }

    const count = await Course.countDocuments();
    if (count > 0) {
      console.log(`Found ${count} existing courses. Clearing them first...`);
      await Course.deleteMany({});
    }

    const dummyCourses = [
    
      {
        title: 'Complete Web Development Bootcamp',
        description: 'Master full-stack web development from scratch with HTML, CSS, JavaScript, React, and Node.js. Build 10+ real-world projects and land your first developer job.',
        instructor: instructor._id,
        category: 'Development',
        imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Python for Data Science & AI',
        description: 'Learn Python programming, data analysis with Pandas & NumPy, machine learning with scikit-learn, and deep learning with TensorFlow. A complete A-to-Z guide.',
        instructor: instructor._id,
        category: 'Development',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'React & Next.js – The Complete Guide',
        description: 'Go from React basics to building production-ready apps with Next.js, TypeScript, Tailwind CSS, and modern state management. Includes SSR, SSG, and deployment.',
        instructor: instructor._id,
        category: 'Development',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Mobile App Development with Flutter',
        description: 'Build beautiful cross-platform iOS and Android apps using Flutter and Dart. Learn state management, animations, Firebase integration, and publish to app stores.',
        instructor: instructor._id,
        category: 'Development',
        imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },

  
      {
        title: 'UI/UX Design Masterclass',
        description: 'Learn user interface and user experience design principles. Master Figma and Adobe XD to design stunning, accessible, and user-friendly digital products from scratch.',
        instructor: instructor._id,
        category: 'Design',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Graphic Design Fundamentals',
        description: 'Master the core principles of graphic design — typography, colour theory, composition, and branding. Create stunning visuals using Adobe Illustrator and Photoshop.',
        instructor: instructor._id,
        category: 'Design',
        imageUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },

      
      {
        title: 'Advanced Business Strategy',
        description: 'Learn how to build and scale successful businesses. Understand market dynamics, competitive advantage, leadership, and the frameworks used by Fortune 500 companies.',
        instructor: instructor._id,
        category: 'Business',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Entrepreneurship: From Idea to Launch',
        description: 'Turn your idea into a thriving startup. Cover ideation, market validation, business models, fundraising, and go-to-market strategies with real founder case studies.',
        instructor: instructor._id,
        category: 'Business',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Financial Planning & Investment Basics',
        description: 'Learn personal finance, budgeting, stock market investing, index funds, and how to build long-term wealth. Practical strategies for every income level.',
        instructor: instructor._id,
        category: 'Business',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },

      {
        title: 'Mastering Digital Marketing',
        description: 'A complete guide to SEO, Social Media Marketing, Email Campaigns, PPC advertising, and Analytics. Grow any business online using proven modern marketing strategies.',
        instructor: instructor._id,
        category: 'Marketing',
        imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Content Marketing & Copywriting',
        description: 'Learn the art of writing compelling content that converts. Master SEO copywriting, blog strategy, email sequences, ad copy, and storytelling for brands.',
        instructor: instructor._id,
        category: 'Marketing',
        imageUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },

  
      {
        title: 'Productivity & Time Management Mastery',
        description: 'Unlock peak productivity using proven frameworks like GTD, time-blocking, and the Pomodoro technique. Build habits, eliminate distractions, and achieve more in less time.',
        instructor: instructor._id,
        category: 'Personal Development',
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
    ];

    await Course.insertMany(dummyCourses);
    console.log(`✅ Successfully seeded ${dummyCourses.length} courses!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
};

seedCourses();
