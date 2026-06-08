import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { ArrowLeft, Send, Play, MessageCircle, BookOpen, AlertCircle } from 'lucide-react';

const Lesson = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const [lessonRes, commentsRes] = await Promise.all([
          api.get(`/lessons/${id}`),
          api.get(`/comments/lesson/${id}`),
        ]);
        setLesson(lessonRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Failed to fetch lesson data', err);
        setError('Failed to load lesson. You may need to enroll in this course first.');
      } finally {
        setLoading(false);
      }
    };
    fetchLessonData();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post(`/comments/lesson/${id}`, { text: newComment.trim() });
      setComments([data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) return <div className="loading-wrapper"><div className="spinner-border"></div></div>;

  if (error || !lesson) return (
    <div className="container py-5 text-center">
      <div className="empty-state mx-auto" style={{ maxWidth: 420 }}>
        <div className="empty-state-icon"><AlertCircle size={32} /></div>
        <h5 className="fw-bold">Access Denied</h5>
        <p className="text-muted small">{error || 'Lesson not found.'}</p>
        <Link to="/courses" className="btn btn-primary mt-2">Browse Courses</Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container py-4">
        {/* Back Link */}
        <Link
          to={`/courses/${lesson.course}`}
          className="d-inline-flex align-items-center gap-2 mb-4 text-decoration-none fw-semibold"
          style={{ color: '#6366f1', fontSize: '0.9rem' }}
        >
          <ArrowLeft size={16} /> Back to Course
        </Link>

        <div className="row g-4">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Video Area */}
            <div className="card border-0 mb-4" style={{ overflow: 'hidden' }}>
              <div className="video-placeholder" style={{ minHeight: '380px' }}>
                <div className="text-center" style={{ position: 'relative', zIndex: 1 }}>
                  <div className="play-icon mb-3 mx-auto" style={{ cursor: 'pointer' }}>
                    <Play size={28} color="white" fill="white" />
                  </div>
                  <p className="text-white fw-semibold mb-1" style={{ fontSize: '1.1rem' }}>{lesson.title}</p>
                  <p className="mb-0" style={{ color: '#64748b', fontSize: '0.85rem' }}>Video content • Click to play</p>
                </div>
              </div>
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span style={{
                    background: 'rgba(99,102,241,0.1)', color: '#6366f1',
                    fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px',
                    borderRadius: '100px', letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>
                    Lesson Content
                  </span>
                </div>
                <h2 className="fw-bold mb-4" style={{ letterSpacing: '-0.02em' }}>{lesson.title}</h2>
                <div
                  className="lesson-content"
                  style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.97rem', whiteSpace: 'pre-line' }}
                >
                  {lesson.content}
                </div>
              </div>
            </div>
          </div>

          {/* Discussion Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 sticky-top" style={{ top: '80px' }}>
              <div className="card-body p-4">
                {/* Header */}
                <div className="d-flex align-items-center gap-2 mb-4">
                  <MessageCircle size={20} style={{ color: '#6366f1' }} />
                  <h5 className="fw-bold mb-0">Discussion</h5>
                  <span className="ms-auto badge rounded-pill" style={{
                    background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontWeight: 700,
                  }}>
                    {comments.length}
                  </span>
                </div>

                {/* Comment Input */}
                {user ? (
                  <form onSubmit={handleAddComment} className="mb-4">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div style={{
                        width: 30, height: 30, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '12px', fontWeight: 700, flexShrink: 0,
                      }}>
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Share your thoughts..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        style={{ fontSize: '0.9rem' }}
                      />
                    </div>
                    <div className="text-end">
                      <button
                        className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1"
                        type="submit"
                        disabled={!newComment.trim() || submitting}
                      >
                        {submitting ? <span className="spinner-border spinner-border-sm" /> : <Send size={14} />}
                        Post
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="alert alert-warning py-2 small mb-4">
                    <Link to="/login" className="fw-semibold">Login</Link> to join the discussion.
                  </div>
                )}

                {/* Comments List */}
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {comments.length > 0 ? (
                    comments.map(comment => (
                      <div key={comment._id} className="d-flex gap-3 mb-4">
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontSize: '12px', fontWeight: 700, flexShrink: 0,
                        }}>
                          {comment.user?.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div className="flex-grow-1">
                          <div className="comment-bubble">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className="fw-semibold" style={{ fontSize: '0.85rem' }}>
                                {comment.user?.name || 'Anonymous'}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="mb-0" style={{ fontSize: '0.875rem', color: '#334155' }}>
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <MessageCircle size={32} style={{ color: '#cbd5e1', marginBottom: 12 }} />
                      <p className="text-muted small mb-0">No comments yet. Be the first!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
