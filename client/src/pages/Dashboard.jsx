import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  PlusCircle, BookOpen, Users, Trash2, Edit3, Eye,
  TrendingUp, Award, BarChart3, GraduationCap,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState('');

  const isInstructor = user?.role === 'instructor';

  const fetchDashboardData = async () => {
    try {
      const endpoint = isInstructor ? '/courses/instructor-courses' : '/courses/my-courses';
      const { data } = await api.get(endpoint);
      setCourses(Array.isArray(data) ? data : (data?.courses || []));
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    setDeleting(courseId);
    try {
      await api.delete(`/courses/${courseId}`);
      setCourses(prev => prev.filter(c => c._id !== courseId));
      setDeleteMsg('Course deleted successfully.');
      setTimeout(() => setDeleteMsg(''), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete course');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div className="loading-wrapper"><div className="spinner-border"></div></div>;

  const stats = isInstructor
    ? [
        { icon: <BookOpen size={22} />, label: 'My Courses', value: courses.length, color: '#6366f1' },
        { icon: <Users size={22} />, label: 'Est. Students', value: courses.length * 12, color: '#10b981' },
        { icon: <TrendingUp size={22} />, label: 'Avg Rating', value: '4.8 ★', color: '#f59e0b' },
        { icon: <Award size={22} />, label: 'Certificates', value: courses.length * 8, color: '#8b5cf6' },
      ]
    : [
        { icon: <GraduationCap size={22} />, label: 'Enrolled', value: courses.length, color: '#6366f1' },
        { icon: <BookOpen size={22} />, label: 'Lessons', value: courses.length * 5, color: '#10b981' },
        { icon: <BarChart3 size={22} />, label: 'Progress', value: '68%', color: '#f59e0b' },
        { icon: <Award size={22} />, label: 'Certificates', value: Math.floor(courses.length / 2), color: '#8b5cf6' },
      ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2.5rem 0' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <div className="d-flex align-items-center gap-3 mb-2">
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '20px', fontWeight: 800,
                }}>
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h2 className="fw-bold text-white mb-0" style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
                    Welcome back, {user?.name?.split(' ')[0]}!
                  </h2>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span className={`role-badge ${isInstructor ? 'role-instructor' : 'role-student'}`}>
                      {isInstructor ? '🎓 Instructor' : '📚 Student'}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{user?.email}</span>
                  </div>
                </div>
              </div>
            </div>
            {isInstructor && (
              <Link to="/create-course" className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2">
                <PlusCircle size={18} /> Create New Course
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Stats Grid */}
        <div className="row g-4 mb-5">
          {stats.map((stat, i) => (
            <div key={i} className="col-6 col-lg-3">
              <div className="card border-0 p-4 h-100" style={{ background: 'white' }}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div style={{
                    width: 44, height: 44, borderRadius: '10px',
                    background: `${stat.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: stat.color,
                  }}>
                    {stat.icon}
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete message */}
        {deleteMsg && (
          <div className="alert alert-success mb-4">{deleteMsg}</div>
        )}

        {/* Courses Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0" style={{ letterSpacing: '-0.02em' }}>
            {isInstructor ? '📘 My Created Courses' : '📖 My Enrolled Courses'}
          </h4>
          {isInstructor && (
            <Link to="/create-course" className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
              <PlusCircle size={14} /> New Course
            </Link>
          )}
        </div>

        {courses.length > 0 ? (
          <div className="row g-4">
            {courses.map(course => (
              <div key={course._id} className="col-md-6 col-lg-4">
                <DashboardCourseCard
                  course={course}
                  isInstructor={isInstructor}
                  onDelete={handleDelete}
                  deleting={deleting}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              {isInstructor ? <BookOpen size={32} /> : <GraduationCap size={32} />}
            </div>
            <h5 className="fw-bold">
              {isInstructor ? "You haven't created any courses yet" : "You haven't enrolled in any courses"}
            </h5>
            <p className="text-muted small">
              {isInstructor ? 'Share your knowledge with the world!' : 'Start exploring courses to begin your journey.'}
            </p>
            <Link
              to={isInstructor ? '/create-course' : '/courses'}
              className="btn btn-primary mt-2"
            >
              {isInstructor ? 'Create Your First Course' : 'Explore Courses'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

/* Inner component for dashboard course card */
const DashboardCourseCard = ({ course, isInstructor, onDelete, deleting }) => {
  const imgSrc = course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="card border-0 h-100" style={{ overflow: 'hidden' }}>
      {/* Image */}
      <div style={{ height: 160, overflow: 'hidden' }}>
        <img
          src={imgSrc}
          alt={course.title}
          className="w-100 h-100"
          style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'; }}
        />
      </div>

      <div className="card-body p-4">
        {/* Category */}
        <span style={{
          background: 'rgba(99,102,241,0.1)', color: '#6366f1',
          fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px',
          borderRadius: '100px', letterSpacing: '0.05em',
          display: 'inline-block', marginBottom: '8px',
        }}>
          {course.category}
        </span>

        <h6 className="fw-bold mb-1" style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
          {course.title}
        </h6>
        <p className="text-muted small mb-4" style={{ lineHeight: 1.5 }}>
          {(course.description || '').substring(0, 75)}...
        </p>

        {/* Actions */}
        <div className="d-flex gap-2 mt-auto">
          <Link
            to={`/courses/${course._id}`}
            className="btn btn-sm btn-outline-primary flex-fill d-flex align-items-center justify-content-center gap-1"
          >
            <Eye size={13} /> View
          </Link>

          {isInstructor && (
            <>
              <Link
                to={`/edit-course/${course._id}`}
                className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                title="Edit course"
              >
                <Edit3 size={13} />
              </Link>
              <button
                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                onClick={() => onDelete(course._id)}
                disabled={deleting === course._id}
                title="Delete course"
              >
                {deleting === course._id
                  ? <span className="spinner-border spinner-border-sm" />
                  : <Trash2 size={13} />
                }
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
