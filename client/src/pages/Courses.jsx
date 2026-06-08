import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import api from '../services/api';
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

 
  const selectedCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);


  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const categories = useMemo(() => (
  ['All', ...new Set((Array.isArray(courses) ? courses : []).map(c => c.category))]
), [courses]);

  const filteredCourses = useMemo(() => (
  (Array.isArray(courses) ? courses : []).filter(course => {
    const matchesSearch = !searchTerm ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.instructor?.name || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  })
), [courses, searchTerm, selectedCategory]);
  

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const setCategory = (cat) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '3.5rem 0' }}>
        <div className="container">
          <p className="text-uppercase fw-bold small mb-2" style={{ color: '#a5b4fc', letterSpacing: '0.08em' }}>
            Learning Library
          </p>
          <h1 className="fw-bold mb-2" style={{ fontSize: '2.2rem', letterSpacing: '-0.03em' }}>
            Explore All Courses
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: 500 }}>
            {courses.length} courses across {categories.length - 1} categories — find the perfect one for you.
          </p>
        </div>
      </div>

      <div className="container py-5">
       
        <div className="card p-3 mb-4" style={{ background: 'white', border: 'none' }}>
          <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center">
            {/* Search */}
            <div className="input-group flex-grow-1">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <Search size={16} />
              </span>
              <input
                id="course-search"
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search courses, instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
           
            <div className="text-muted small fw-semibold text-nowrap">
              <SlidersHorizontal size={14} className="me-1" />
              {filteredCourses.length} results
            </div>
          </div>
        </div>

       
        <div className="d-flex gap-2 flex-wrap mb-5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        
        {loading ? (
          <div className="loading-wrapper">
            <div className="spinner-border"></div>
          </div>
        ) : paginatedCourses.length > 0 ? (
          <>
            <div className="row g-4">
              {paginatedCourses.map((course, i) => (
                <div key={course._id} className="col-md-6 col-lg-4">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>

          
            {totalPages > 1 && (
              <nav className="mt-5 d-flex justify-content-center" aria-label="Courses pagination">
                <ul className="pagination gap-1">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link rounded-3 border-0"
                      onClick={() => setCurrentPage(p => p - 1)}
                      style={{ color: '#6366f1' }}
                    >
                      ‹ Prev
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                      <button
                        className="page-link rounded-3 border-0"
                        onClick={() => setCurrentPage(page)}
                        style={page === currentPage ? {
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          color: 'white',
                        } : { color: '#6366f1' }}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link rounded-3 border-0"
                      onClick={() => setCurrentPage(p => p + 1)}
                      style={{ color: '#6366f1' }}
                    >
                      Next ›
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        ) : (
          <div className="empty-state mx-auto" style={{ maxWidth: 420 }}>
            <div className="empty-state-icon">
              <BookOpen size={32} />
            </div>
            <h5 className="fw-bold">No courses found</h5>
            <p className="text-muted small">
              {searchTerm
                ? `No results for "${searchTerm}". Try a different search term.`
                : 'No courses in this category yet.'}
            </p>
            <button
              className="btn btn-outline-primary mt-2"
              onClick={() => { setSearchTerm(''); setCategory('All'); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
