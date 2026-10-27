import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useAssessmentStore } from './store/assessmentStore';

// Import the REAL pages
import { Landing } from './pages/Landing';
import { RoleSelect } from './pages/RoleSelect';
import { Quiz } from './pages/Quiz';
import { Processing } from './pages/Processing';
import { Report } from './pages/Report';
import { QUESTIONS } from './data/questions';

const ProtectedRoute = ({ children, requiredRole = false, requiredAnswers = false }: { children: React.ReactNode, requiredRole?: boolean, requiredAnswers?: boolean }) => {
  const { role, answers } = useAssessmentStore();

  if (requiredRole && !role) {
    return <Navigate to="/role" replace />;
  }

  if (requiredAnswers && role) {
    const roleQuestions = QUESTIONS[role] || [];
    const completed = roleQuestions.every(q => answers[q.id] !== undefined);
    if (!completed) {
      return <Navigate to="/quiz" replace />;
    }
  }

  return <>{children}</>;
};

export default function App() {
  const { theme, toggleTheme } = useAssessmentStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Layout>
        <button
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[var(--card)] border border-[var(--border)] shadow-lg hover:scale-110 transition-transform active:scale-90"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/role" element={<RoleSelect />} />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute requiredRole>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/processing"
            element={
              <ProtectedRoute requiredRole>
                <Processing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute requiredRole requiredAnswers>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
