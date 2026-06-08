import React from 'react';
import { Link } from 'react-router-dom';
import { User, ArrowRight } from 'lucide-react';

const FALLBACK_IMAGES = {
  Development: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  Business: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  Design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
  Marketing: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
  'Personal Development': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
};

const CATEGORY_COLORS = {
  Development: { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' },
  Business: { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
  Design: { bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
  Marketing: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
  'Personal Development': { bg: 'rgba(139,92,246,0.1)', color: '#8b5cf6' },
};

const CourseCard = ({ course }) => {
  const imgSrc = course.imageUrl || FALLBACK_IMAGES[course.category] || FALLBACK_IMAGES.default;
  const catColors = CATEGORY_COLORS[course.category] || { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' };
  const desc = course.description || '';
  const truncated = desc.length > 90 ? desc.substring(0, 90) + '...' : desc;

  return (
    <div className="card h-100" style={{ overflow: 'hidden' }}>
    
      <div style={{ overflow: 'hidden', height: '200px' }}>
        <img
          src={imgSrc}
          className="course-card-img w-100"
          alt={course.title}
          onError={(e) => { e.target.src = FALLBACK_IMAGES.default; }}
        />
      </div>

      <div className="card-body d-flex flex-column p-4">
        {/* Category Badge */}
        <div className="mb-3">
          <span
            className="badge"
            style={{
              background: catColors.bg,
              color: catColors.color,
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '5px 10px',
              letterSpacing: '0.04em',
            }}
          >
            {course.category}
          </span>
        </div>

        {/* Title */}
        <h5 className="fw-bold mb-2" style={{ fontSize: '1rem', lineHeight: 1.4 }}>
          {course.title}
        </h5>

        {/* Description */}
        <p className="text-muted small mb-4 flex-grow-1" style={{ lineHeight: 1.6 }}>
          {truncated}
        </p>

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center pt-3 mt-auto" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="d-flex align-items-center gap-2">
            <div style={{
              width: '28px', height: '28px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '11px', fontWeight: 700,
            }}>
              {course.instructor?.name?.charAt(0)?.toUpperCase() || 'I'}
            </div>
            <small className="text-muted" style={{ fontSize: '0.78rem' }}>
              {course.instructor?.name || 'Instructor'}
            </small>
          </div>
          <Link
            to={`/courses/${course._id}`}
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            style={{ fontSize: '0.8rem' }}
          >
            View <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
