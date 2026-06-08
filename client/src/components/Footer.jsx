import { Link } from 'react-router-dom';
import { BookOpen, Mail, Globe, Share2, ExternalLink, ArrowRight } from 'lucide-react';

const PLATFORM_LINKS = [
  { label: 'Courses', to: '/courses' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Register', to: '/register' },
  { label: 'Login', to: '/login' },
];

const CATEGORY_LINKS = [
  { label: 'Development', to: '/courses?category=Development' },
  { label: 'Business', to: '/courses?category=Business' },
  { label: 'Design', to: '/courses?category=Design' },
  { label: 'Marketing', to: '/courses?category=Marketing' },
  { label: 'Personal Development', to: '/courses?category=Personal+Development' },
];

const SOCIAL_LINKS = [
  { icon: Share2, href: '#', label: 'Share' },
  { icon: Globe, href: '#', label: 'Website' },
  { icon: ExternalLink, href: '#', label: 'External' },
  { icon: Mail, href: '#', label: 'Email' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', marginTop: 'auto' }}>
      {/* Main Footer Content */}
      <div className="container py-5">
        <div className="row g-4">

          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-3">
              <div style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '8px',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <BookOpen size={18} color="white" />
              </div>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>
                EduLearn
              </span>
            </Link>

            <p className="small mb-4" style={{ lineHeight: 1.8, maxWidth: 300 }}>
              Empowering learners worldwide with expert-led courses, interactive lessons,
              and a vibrant community. Start your journey today.
            </p>

            <div className="d-flex gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.07)',
                    color: '#94a3b8',
                    transition: 'all 0.25s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#6366f1';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 style={{ color: 'white', fontWeight: 700, marginBottom: '1.1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Platform
            </h6>
            <ul className="list-unstyled m-0">
              {PLATFORM_LINKS.map(item => (
                <li key={item.label} className="mb-2">
                  <Link
                    to={item.to}
                    className="small text-decoration-none"
                    style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 style={{ color: 'white', fontWeight: 700, marginBottom: '1.1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Categories
            </h6>
            <ul className="list-unstyled m-0">
              {CATEGORY_LINKS.map(item => (
                <li key={item.label} className="mb-2">
                  <Link
                    to={item.to}
                    className="small text-decoration-none"
                    style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4">
            <h6 style={{ color: 'white', fontWeight: 700, marginBottom: '1.1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Stay in the Loop
            </h6>
            <p className="small mb-3" style={{ lineHeight: 1.7 }}>
              Get notified about new courses, exclusive offers, and learning tips delivered straight to your inbox.
            </p>
            <div className="d-flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="form-control form-control-sm"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'white',
                  borderRadius: '8px',
                }}
              />
              <button
                className="btn btn-primary btn-sm d-flex align-items-center gap-1 px-3"
                style={{ whiteSpace: 'nowrap', borderRadius: '8px' }}
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <p className="small mb-0" style={{ color: '#475569' }}>
              © {currentYear} EduLearn. All rights reserved.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                <a
                  key={item}
                  href="#"
                  className="small text-decoration-none"
                  style={{ color: '#475569', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#475569'; }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
