import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {/* Left decorative panel */}
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
              Welcome back to your learning journey
            </h2>
            <p className="text-muted mb-5" style={{ lineHeight: 1.7 }}>
              Sign in to continue where you left off. Access your courses, track your progress, and keep growing.
            </p>
            {[
              '✅ Access all your enrolled courses',
              '✅ Track your learning progress',
              '✅ Join community discussions',
              '✅ Download certificates',
            ].map((item, i) => (
              <div key={i} className="d-flex align-items-center gap-2 mb-2">
                <span style={{ fontSize: '0.9rem', color: '#334155' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Login Card */}
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
                  <BookOpen size={24} color="white" />
                </div>
                <h3 className="fw-bold mb-1">Sign In</h3>
                <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: 0 }}>
                  Welcome back! Please enter your details.
                </p>
              </div>

              <div className="card-body p-4 p-md-5">
                {error && (
                  <div className="alert alert-danger d-flex align-items-center gap-2 mb-4">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-4">
                    <label className="form-label">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted">
                        <Mail size={16} />
                      </span>
                      <input
                        id="login-email"
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
                  <div className="mb-5">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted">
                        <Lock size={16} />
                      </span>
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        className="form-control border-start-0 border-end-0"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        autoComplete="current-password"
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
                  </div>

                  <button
                    id="login-submit"
                    type="submit"
                    className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 mb-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <><span className="spinner-border spinner-border-sm" /> Signing in...</>
                    ) : (
                      <>Sign In <ArrowRight size={16} /></>
                    )}
                  </button>

                  <p className="text-center text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                    Don't have an account?{' '}
                    <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: '#6366f1' }}>
                      Create one free
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

export default Login;
