import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Dashboard from './pages/Dashboard';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import Lesson from './pages/Lesson';
import PrivateRoute from './components/PrivateRoute';

const NotFound = () => (
  <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="text-center">
      <div style={{ fontSize: '5rem', fontWeight: 900, color: '#6366f1', lineHeight: 1 }}>404</div>
      <h2 className="fw-bold mt-2 mb-3">Page Not Found</h2>
      <p className="text-muted mb-4">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="btn btn-primary px-5">Go Home</a>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />

              {/* Protected Routes (any authenticated user) */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/lessons/:id" element={<Lesson />} />
              </Route>

              {/* Protected Routes (instructor only) */}
              <Route element={<PrivateRoute roles={['instructor']} />}>
                <Route path="/create-course" element={<CreateCourse />} />
                <Route path="/edit-course/:id" element={<EditCourse />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
