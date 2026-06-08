import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import api from '../services/api';
import { ArrowRight, BookOpen, Users, Award, TrendingUp, Star, Play } from 'lucide-react';

const CATEGORIES = [
  { name: 'Development', icon: '💻' },
  { name: 'Business', icon: '📈' },
  { name: 'Design', icon: '🎨' },
  { name: 'Marketing', icon: '📣' },
  { name: 'Personal Development', icon: '🌱' },
];

const FEATURES = [
  {
    icon: <BookOpen size={24} />,
    title: 'Expert-Led Courses',
    desc: 'Learn from industry professionals with real-world experience.',
  },
  {
    icon: <Users size={24} />,
    title: 'Vibrant Community',
    desc: 'Connect, collaborate, and grow with thousands of learners.',
  },
  {
    icon: <Award size={24} />,
    title: 'Earn Certificates',
    desc: 'Get recognized credentials to advance your career.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Learn at Your Pace',
    desc: 'Access content anytime, anywhere, on any device.',
  },
];

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        const courses = Array.isArray(data) ? data : (data?.courses || []);
        setFeaturedCourses(courses.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch featured courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="hero-section text-center">
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="hero-badge">
            <Star size={12} fill="currentColor" /> Trusted by 50,000+ learners worldwide
          </div>
          <h1 className="hero-title">
            Unlock Your <span className="gradient-text">Full Potential</span>
            <br />with Expert-Led Courses
          </h1>
          <p className="hero-subtitle mx-auto">
            Discover world-class courses taught by industry experts. Advance your career,
            learn new skills, or pursue your passion — all in one place.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/courses" className="btn btn-primary btn-lg px-5 py-3 d-flex align-items-center gap-2">
              Explore Courses <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn btn-outline-primary btn-lg px-5 py-3">
              Join for Free
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Instructors</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">4.9★</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
            <span className="text-muted fw-semibold me-2 small text-uppercase" style={{ letterSpacing: '0.08em' }}>Browse Topics:</span>
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="text-decoration-none"
              >
                <span className="category-pill">
                  {cat.icon} {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="py-5">
        <div className="container my-4">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <p className="text-primary fw-bold small mb-1 text-uppercase" style={{ letterSpacing: '0.08em' }}>Top Picks</p>
              <h2 className="section-title mb-1">Featured Courses</h2>
              <p className="section-subtitle mb-0">Handpicked courses to accelerate your growth</p>
            </div>
            <Link to="/courses" className="text-primary text-decoration-none fw-bold d-flex align-items-center gap-2 d-none d-md-flex">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="loading-wrapper">
              <div className="spinner-border"></div>
            </div>
          ) : (
            <div className="row g-4">
              {featuredCourses.length > 0 ? (
                featuredCourses.map((course, i) => (
                  <div key={course._id} className="col-md-4" style={{ animationDelay: `${i * 0.1}s` }}>
                    <CourseCard course={course} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="empty-state mx-auto" style={{ maxWidth: 400 }}>
                    <div className="empty-state-icon">
                      <BookOpen size={32} />
                    </div>
                    <h5 className="fw-bold">No courses yet</h5>
                    <p className="text-muted small">Be the first to create a course!</p>
                    <Link to="/register" className="btn btn-primary mt-2">Get Started</Link>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-4 d-md-none">
            <Link to="/courses" className="btn btn-outline-primary px-4">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* ── Why EduLearn ── */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f0fdf4 100%)' }}>
        <div className="container my-4">
          <div className="text-center mb-5">
            <p className="text-primary fw-bold small mb-1 text-uppercase" style={{ letterSpacing: '0.08em' }}>Why EduLearn</p>
            <h2 className="section-title mb-2">Everything You Need to Succeed</h2>
            <p className="section-subtitle">A complete learning ecosystem built for modern learners</p>
          </div>
          <div className="row g-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="card h-100 p-4 border-0">
                  <div className="feature-icon mb-3">{f.icon}</div>
                  <h5 className="fw-bold mb-2">{f.title}</h5>
                  <p className="text-muted small mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
        <div className="container text-center py-3">
          <h2 className="fw-bold text-white mb-3" style={{ fontSize: '2rem' }}>
            Start Learning Today — It's Free!
          </h2>
          <p className="text-white mb-4" style={{ opacity: 0.85 }}>
            Join thousands of students already learning on EduLearn.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/register" className="btn btn-light btn-lg px-5 fw-bold" style={{ color: '#6366f1' }}>
              Create Free Account
            </Link>
            <Link to="/courses" className="btn btn-outline-light btn-lg px-5">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
