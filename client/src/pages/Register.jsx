import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, User, Mail, Lock, ArrowRight, Eye, EyeOff, GraduationCap } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {/* Left Panel */}
          <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-center pe-5">
            <div className="d-flex align-items-center gap-2 mb-5">
              <div style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '10px', width: '38px', height: '38px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <BookOpen size={20} color="white" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>EduLearn</span>
            </div>
            <h2 className="fw-bold mb-3" style={{ fontSize: '2rem', letterSpacing: '-0.03em', color: '#0f172a' }}>
              Start your learning journey today
            </h2>
            <p className="text-muted mb-5" style={{ lineHeight: 1.7 }}>
              Join over 50,000 learners who are advancing their careers with EduLearn's expert-led courses.
            </p>
            {/* Role info cards */}
            <div className="d-flex flex-column gap-3">
              <div className="p-3 rounded-3" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <div className="fw-bold mb-1" style={{ color: '#6366f1', fontSize: '0.9rem' }}>📚 Student</div>
                <p className="mb-0 small text-muted">Enroll in courses, track progress, comment on lessons, and earn certificates.</p>
              </div>
              <div className="p-3 rounded-3" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <div className="fw-bold mb-1" style={{ color: '#d97706', fontSize: '0.9rem' }}>🎓 Instructor</div>
                <p className="mb-0 small text-muted">Create and publish courses, manage curriculum, and teach thousands of students.</p>
              </div>
            </div>
          </div>

          {/* Register Card */}
          <div className="col-md-8 col-lg-5">
            <div className="auth-card card">
              {/* Card Header */}
              <div className="auth-card-header">
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                  <GraduationCap size={24} color="white" />
                </div>
                <h3 className="fw-bold mb-1">Create Account</h3>
                <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: 0 }}>
                  It's free and only takes a minute.
                </p>
              </div>

              <div className="card-body p-4 p-md-5">
                {error && (
                  <div className="alert alert-danger d-flex align-items-center gap-2 mb-4">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted"><User size={16} /></span>
                      <input
                        id="register-name"
                        type="text"
                        className="form-control border-start-0"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        placeholder="John Doe"
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted"><Mail size={16} /></span>
                      <input
                        id="register-email"
                        type="email"
                        className="form-control border-start-0"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted"><Lock size={16} /></span>
                      <input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        className="form-control border-start-0 border-end-0"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="Min. 6 characters"
                        minLength={6}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="input-group-text bg-white border-start-0 text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {password && (
                      <div className="mt-1">
                        <div className="progress" style={{ height: 3 }}>
                          <div
                            className="progress-bar"
                            style={{
                              width: password.length >= 10 ? '100%' : password.length >= 6 ? '60%' : '30%',
                              background: password.length >= 10 ? '#10b981' : password.length >= 6 ? '#f59e0b' : '#ef4444',
                            }}
                          />
                        </div>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                          {password.length >= 10 ? '🟢 Strong' : password.length >= 6 ? '🟡 Medium' : '🔴 Too short'}
                        </small>
                      </div>
                    )}
                  </div>

                  {/* Role Selector */}
                  <div className="mb-4">
                    <label className="form-label">I want to</label>
                    <div className="d-flex gap-3">
                      {[
                        { value: 'student', label: '📚 Learn', desc: 'Student' },
                        { value: 'instructor', label: '🎓 Teach', desc: 'Instructor' },
                      ].map(opt => (
                        <div
                          key={opt.value}
                          onClick={() => setRole(opt.value)}
                          className="flex-fill p-3 rounded-3 text-center"
                          style={{
                            border: `2px solid ${role === opt.value ? '#6366f1' : '#e2e8f0'}`,
                            background: role === opt.value ? 'rgba(99,102,241,0.06)' : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          <div style={{ fontSize: '1.2rem' }}>{opt.label.split(' ')[0]}</div>
                          <div className="fw-semibold" style={{ fontSize: '0.85rem', color: role === opt.value ? '#6366f1' : '#334155' }}>
                            {opt.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    id="register-submit"
                    type="submit"
                    className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 mb-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <><span className="spinner-border spinner-border-sm" /> Creating account...</>
                    ) : (
                      <>Create Account <ArrowRight size={16} /></>
                    )}
                  </button>

                  <p className="text-center text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                    Already have an account?{' '}
                    <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: '#6366f1' }}>
                      Sign in
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
