import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { PlayCircle, CheckCircle, Clock, Users, BookOpen, Lock, ArrowLeft, Star } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const [courseRes, lessonsRes] = await Promise.all([
          api.get(`/courses/${id}`),
          api.get(`/lessons/course/${id}`), 
        ]);
        setCourse(courseRes.data);
        setLessons(lessonsRes.data);

  
        if (user && user.role === 'student') {
          try {
            const { data } = await api.get(`/courses/${id}/enrollment-status`);
            setIsEnrolled(data.enrolled);
          } catch (e) {
          
          }
        }
      } catch (error) {
        console.error('Failed to fetch course details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setEnrolling(true);
    setMessage({ type: '', text: '' });
    try {
      await api.post(`/courses/${id}/enroll`);
      setIsEnrolled(true);
      setMessage({ type: 'success', text: '🎉 Successfully enrolled! You can now access all lessons.' });
    } catch (error) {
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Failed to enroll' });
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return (
    <div className="loading-wrapper"><div className="spinner-border"></div></div>
  );
  if (!course) return (
    <div className="container py-5 text-center">
      <h3>Course not found</h3>
      <Link to="/courses" className="btn btn-primary mt-3">Browse Courses</Link>
    </div>
  );

  const isInstructor = user && user.role === 'instructor';
  const isOwner = user && course.instructor && user._id === course.instructor._id;
  const canViewLessons = isEnrolled || isOwner || isInstructor;

  return (
    <div>
   
      <div className="course-hero py-5">
        <div className="container">
          <Link to="/courses" className="d-inline-flex align-items-center gap-2 mb-4 text-decoration-none" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Courses
          </Link>
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="mb-3">
                <span className="badge" style={{
                  background: 'rgba(99,102,241,0.2)', color: '#a5b4fc',
                  fontSize: '0.75rem', padding: '6px 12px', letterSpacing: '0.05em',
                }}>
                  {course.category}
                </span>
              </div>
              <h1 className="fw-bold mb-3 text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                {course.title}
              </h1>
              <p className="mb-4" style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7 }}>
                {course.description}
              </p>

           
              <div className="d-flex align-items-center gap-4 flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '14px',
                  }}>
                    {course.instructor?.name?.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Instructor</div>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{course.instructor?.name}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Clock size={16} style={{ color: '#a5b4fc' }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{lessons.length} Lessons</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Star size={16} style={{ color: '#fbbf24' }} fill="#fbbf24" />
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>4.8 Rating</span>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card border-0" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                {/* Card Image */}
                {course.imageUrl && (
                  <img src={course.imageUrl} alt={course.title} style={{ height: '180px', objectFit: 'cover' }} />
                )}
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-1">Start Learning Today</h4>
                  <p className="text-muted small mb-4">Get instant access to all {lessons.length} lessons</p>

                  {message.text && (
                    <div className={`alert alert-${message.type} py-2 small mb-3`}>{message.text}</div>
                  )}

                  {!user ? (
                    <div>
                      <Link to="/login" className="btn btn-primary btn-lg w-100 mb-3">
                        Login to Enroll
                      </Link>
                      <p className="text-center text-muted small mb-0">
                        No account? <Link to="/register" className="text-primary fw-semibold">Register free</Link>
                      </p>
                    </div>
                  ) : isInstructor && !isOwner ? (
                    <button className="btn btn-outline-secondary w-100" disabled>
                      Instructors cannot enroll
                    </button>
                  ) : isOwner ? (
                    <div>
                      <div className="alert alert-success py-2 small mb-3">
                        ✅ You are the instructor of this course.
                      </div>
                      <Link to={`/dashboard`} className="btn btn-outline-primary w-100">
                        Manage Course
                      </Link>
                    </div>
                  ) : isEnrolled ? (
                    <button className="btn btn-success btn-lg w-100 d-flex align-items-center justify-content-center gap-2" disabled>
                      <CheckCircle size={20} /> Enrolled — Access Lessons Below
                    </button>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      className="btn btn-primary btn-lg w-100"
                      disabled={enrolling}
                    >
                      {enrolling ? (
                        <span><span className="spinner-border spinner-border-sm me-2" />Enrolling...</span>
                      ) : 'Enroll Now — It\'s Free'}
                    </button>
                  )}

            
                  <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    {[
                      { icon: <BookOpen size={14} />, text: `${lessons.length} structured lessons` },
                      { icon: <Clock size={14} />, text: 'Self-paced learning' },
                      { icon: <Users size={14} />, text: 'Community discussion' },
                    ].map((item, i) => (
                      <div key={i} className="d-flex align-items-center gap-2 mb-2" style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        <span style={{ color: '#6366f1' }}>{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h3 className="fw-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              📚 Course Curriculum
              <span className="ms-2 text-muted fw-normal" style={{ fontSize: '1rem' }}>({lessons.length} lessons)</span>
            </h3>

            {lessons.length > 0 ? (
              <div className="card border-0" style={{ overflow: 'hidden' }}>
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson._id}
                    className="lesson-item d-flex justify-content-between align-items-center"
                    style={{
                      borderBottom: index < lessons.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                      background: 'white',
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div style={{
                        width: 36, height: 36, borderRadius: '8px',
                        background: canViewLessons ? 'rgba(99,102,241,0.1)' : 'rgba(100,116,139,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: canViewLessons ? '#6366f1' : '#94a3b8',
                        flexShrink: 0,
                      }}>
                        {canViewLessons ? <PlayCircle size={18} /> : <Lock size={16} />}
                      </div>
                      <div>
                        <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Lesson {index + 1}
                        </div>
                        <div className="fw-semibold" style={{ fontSize: '0.95rem' }}>{lesson.title}</div>
                      </div>
                    </div>
                    {canViewLessons ? (
                      <Link
                        to={`/lessons/${lesson._id}`}
                        className="btn btn-sm btn-primary"
                        style={{ fontSize: '0.8rem', minWidth: 70 }}
                      >
                        Start
                      </Link>
                    ) : (
                      <span className="badge" style={{
                        background: 'rgba(100,116,139,0.1)',
                        color: '#64748b',
                        fontSize: '0.72rem',
                      }}>
                        🔒 Locked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon"><BookOpen size={28} /></div>
                <h6 className="fw-bold">No lessons yet</h6>
                <p className="text-muted small mb-0">The instructor is preparing the content. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
