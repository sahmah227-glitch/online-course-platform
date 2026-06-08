import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, LayoutDashboard, Menu, X, Compass } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <BookOpen size={18} color="white" />
          </div>
          <span>EduLearn</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 p-1"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Nav Items */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/courses') ? 'text-primary fw-semibold' : ''}`}
                to="/courses"
              >
                <Compass size={16} className="me-1 align-text-bottom" />
                Courses
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {user ? (
              <>
                <div className="me-2 d-none d-lg-flex align-items-center gap-2">
                  <div style={{
                    width: '34px', height: '34px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: '700', fontSize: '14px',
                  }}>
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.2 }}>{user.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'capitalize' }}>{user.role}</div>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className={`btn btn-sm d-flex align-items-center gap-1 ${isActive('/dashboard') ? 'btn-primary' : 'btn-outline-primary'}`}
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary px-4">Login</Link>
                <Link to="/register" className="btn btn-primary px-4">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
