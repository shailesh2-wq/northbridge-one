import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Student360Page from './pages/Student360Page';
import AttentionCenterPage from './pages/AttentionCenterPage';
import StudentsPage from './pages/StudentsPage';
import AttendancePage from './pages/AttendancePage';
import InterventionsPage from './pages/InterventionsPage';
import CommunicationsPage from './pages/CommunicationsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ReportsPage from './pages/ReportsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import AcademicsPage from './pages/AcademicsPage';
import FeesPage from './pages/FeesPage';
import StaffWorkloadPage from './pages/StaffWorkloadPage';
import NotFoundPage from './pages/NotFoundPage';
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/case-study" element={<CaseStudyPage />} />
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/students/:id" element={<Student360Page />} />
            <Route path="/attention" element={<AttentionCenterPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/interventions" element={<InterventionsPage />} />
            <Route path="/communications" element={<CommunicationsPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/staff-workload" element={<StaffWorkloadPage />} />
            <Route path="/staff-workload/:id" element={<StaffWorkloadPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
