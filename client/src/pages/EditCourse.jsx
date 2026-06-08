import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Save, ArrowLeft, BookOpen, ImageIcon, PlusCircle, Trash2 } from 'lucide-react';

const CATEGORIES = ['Development', 'Business', 'Design', 'Marketing', 'Personal Development'];

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({ title: '', content: '' });
  const [addingLesson, setAddingLesson] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Development',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const [courseRes, lessonsRes] = await Promise.all([
          api.get(`/courses/${id}`),
          api.get(`/lessons/course/${id}`),
        ]);
        const c = courseRes.data;
        setFormData({
          title: c.title,
          description: c.description,
          category: c.category,
          imageUrl: c.imageUrl || '',
        });
        setLessons(lessonsRes.data);
      } catch (err) {
        setError('Failed to load course data.');
      } finally {
        setFetching(false);
      }
    };
    fetchCourse();
  }, [id]);

  const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.put(`/courses/${id}`, formData);
      setSuccess('✅ Course updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update course.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!newLesson.title.trim() || !newLesson.content.trim()) return;
    setAddingLesson(true);
    try {
      const { data } = await api.post(`/lessons/course/${id}`, newLesson);
      setLessons(prev => [...prev, data]);
      setNewLesson({ title: '', content: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add lesson.');
    } finally {
      setAddingLesson(false);
    }
  };

  if (fetching) return <div className="loading-wrapper"><div className="spinner-border"></div></div>;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem 0' }}>
        <div className="container">
          <Link to="/dashboard" className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="fw-bold text-white mb-1" style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
            Edit Course
          </h1>
          <p style={{ color: '#64748b' }}>Update your course details and curriculum</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            {error && <div className="alert alert-danger mb-4">⚠️ {error}</div>}
            {success && <div className="alert alert-success mb-4">{success}</div>}

            {/* Course Details Form */}
            <form onSubmit={handleSubmit}>
              <div className="card border-0 mb-4">
                <div className="card-body p-5">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: 40, height: 40, borderRadius: '10px',
                      background: 'rgba(99,102,241,0.1)', color: '#6366f1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0">Course Details</h4>
                      <p className="text-muted small mb-0">Update basic information</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Course Title <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={formData.title}
                      onChange={e => updateForm('title', e.target.value)}
                    />
                  </div>

                  <div className="row mb-4 g-3">
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={e => updateForm('category', e.target.value)}
                      >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        <ImageIcon size={13} className="me-1" /> Image URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        value={formData.imageUrl}
                        onChange={e => updateForm('imageUrl', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Description <span className="text-danger">*</span></label>
                    <textarea
                      className="form-control"
                      rows="4"
                      required
                      value={formData.description}
                      onChange={e => updateForm('description', e.target.value)}
                    />
                  </div>

                  <div className="d-flex gap-3 justify-content-end mt-4 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <button
                      type="button"
                      className="btn btn-light px-4"
                      onClick={() => navigate('/dashboard')}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-5 d-flex align-items-center gap-2"
                      disabled={loading}
                    >
                      {loading ? <span className="spinner-border spinner-border-sm" /> : <Save size={16} />}
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Existing Lessons */}
            <div className="card border-0 mb-4">
              <div className="card-body p-5">
                <h4 className="fw-bold mb-4">Existing Lessons ({lessons.length})</h4>

                {lessons.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {lessons.map((lesson, index) => (
                      <div
                        key={lesson._id}
                        className="p-3 rounded-3 d-flex align-items-center gap-3"
                        style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.06)' }}
                      >
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          color: 'white', fontSize: '12px', fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {index + 1}
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>{lesson.title}</div>
                          <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                            {(lesson.content || '').substring(0, 80)}...
                          </div>
                        </div>
                        <Link
                          to={`/lessons/${lesson._id}`}
                          className="btn btn-sm btn-outline-primary"
                          style={{ fontSize: '0.78rem' }}
                        >
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted small">No lessons yet. Add your first lesson below.</p>
                )}
              </div>
            </div>

            {/* Add New Lesson */}
            <div className="card border-0">
              <div className="card-body p-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div style={{
                    width: 40, height: 40, borderRadius: '10px',
                    background: 'rgba(16,185,129,0.1)', color: '#10b981',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <PlusCircle size={20} />
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">Add New Lesson</h4>
                    <p className="text-muted small mb-0">Expand your course curriculum</p>
                  </div>
                </div>

                <form onSubmit={handleAddLesson}>
                  <div className="mb-3">
                    <label className="form-label">Lesson Title <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={newLesson.title}
                      onChange={e => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. Advanced State Management"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Lesson Content <span className="text-danger">*</span></label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={newLesson.content}
                      onChange={e => setNewLesson(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write lesson content..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success d-flex align-items-center gap-2"
                    disabled={addingLesson || !newLesson.title.trim() || !newLesson.content.trim()}
                  >
                    {addingLesson
                      ? <span className="spinner-border spinner-border-sm" />
                      : <PlusCircle size={16} />}
                    Add Lesson
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
