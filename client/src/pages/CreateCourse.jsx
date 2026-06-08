import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { PlusCircle, Trash2, BookOpen, ArrowLeft, ImageIcon } from 'lucide-react';

const CATEGORIES = ['Development', 'Business', 'Design', 'Marketing', 'Personal Development'];

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Development',
    imageUrl: '',
  });

  const [lessons, setLessons] = useState([{ title: '', content: '' }]);

  const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleLessonChange = (index, field, value) => {
    setLessons(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addLesson = () => setLessons(prev => [...prev, { title: '', content: '' }]);

  const removeLesson = (index) => {
    if (lessons.length === 1) return;
    setLessons(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: courseData } = await api.post('/courses', formData);

      const validLessons = lessons.filter(l => l.title.trim() && l.content.trim());
      for (const lesson of validLessons) {
        await api.post(`/lessons/course/${courseData._id}`, lesson);
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem 0' }}>
        <div className="container">
          <Link to="/dashboard" className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="fw-bold text-white mb-1" style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
            Create a New Course
          </h1>
          <p style={{ color: '#64748b' }}>Share your expertise with thousands of learners</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            {error && (
              <div className="alert alert-danger mb-4 d-flex align-items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* ── Section 1: Course Info ── */}
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
                      <p className="text-muted small mb-0">Basic information about your course</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Course Title <span className="text-danger">*</span></label>
                    <input
                      id="course-title"
                      type="text"
                      className="form-control"
                      required
                      value={formData.title}
                      onChange={e => updateForm('title', e.target.value)}
                      placeholder="e.g. Complete React Development Bootcamp"
                    />
                  </div>

                  <div className="row mb-4 g-3">
                    <div className="col-md-6">
                      <label className="form-label">Category <span className="text-danger">*</span></label>
                      <select
                        id="course-category"
                        className="form-select"
                        value={formData.category}
                        onChange={e => updateForm('category', e.target.value)}
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        <ImageIcon size={14} className="me-1" />
                        Course Image URL
                        <span className="text-muted ms-1">(optional)</span>
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        value={formData.imageUrl}
                        onChange={e => updateForm('imageUrl', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Description <span className="text-danger">*</span></label>
                    <textarea
                      id="course-description"
                      className="form-control"
                      rows="4"
                      required
                      value={formData.description}
                      onChange={e => updateForm('description', e.target.value)}
                      placeholder="Describe what students will learn, prerequisites, and course outcomes..."
                    />
                    <small className="text-muted">{formData.description.length} characters</small>
                  </div>
                </div>
              </div>

              {/* ── Section 2: Lessons ── */}
              <div className="card border-0 mb-4">
                <div className="card-body p-5">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <div style={{
                        width: 40, height: 40, borderRadius: '10px',
                        background: 'rgba(16,185,129,0.1)', color: '#10b981',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <PlusCircle size={20} />
                      </div>
                      <div>
                        <h4 className="fw-bold mb-0">Curriculum</h4>
                        <p className="text-muted small mb-0">{lessons.length} lesson{lessons.length !== 1 ? 's' : ''} added</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                      onClick={addLesson}
                    >
                      <PlusCircle size={14} /> Add Lesson
                    </button>
                  </div>

                  <div className="d-flex flex-column gap-4">
                    {lessons.map((lesson, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-3 position-relative"
                        style={{
                          background: '#f8fafc',
                          border: '1.5px solid rgba(99,102,241,0.12)',
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <div style={{
                              width: 26, height: 26, borderRadius: '50%',
                              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                              color: 'white', fontSize: '12px', fontWeight: 700,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              {index + 1}
                            </div>
                            <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>Lesson {index + 1}</span>
                          </div>
                          {lessons.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                              onClick={() => removeLesson(index)}
                              style={{ fontSize: '0.78rem' }}
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          )}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Lesson Title <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={lesson.title}
                            onChange={e => handleLessonChange(index, 'title', e.target.value)}
                            placeholder={`e.g. Introduction to ${formData.category || 'the Topic'}`}
                          />
                        </div>

                        <div>
                          <label className="form-label">Lesson Content <span className="text-danger">*</span></label>
                          <textarea
                            className="form-control"
                            rows="4"
                            required
                            value={lesson.content}
                            onChange={e => handleLessonChange(index, 'content', e.target.value)}
                            placeholder="Write the lesson content here. You can include text, links, code snippets..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-4 d-flex align-items-center justify-content-center gap-2"
                    onClick={addLesson}
                    style={{ borderStyle: 'dashed' }}
                  >
                    <PlusCircle size={16} /> Add Another Lesson
                  </button>
                </div>
              </div>

              {/* ── Actions ── */}
              <div className="d-flex gap-3 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light px-5"
                  onClick={() => navigate('/dashboard')}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-5 d-flex align-items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm" /> Publishing...</>
                  ) : (
                    <><BookOpen size={16} /> Publish Course</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
