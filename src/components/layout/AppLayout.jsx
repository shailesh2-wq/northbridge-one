import { Outlet, useLocation } from 'react-router-dom';
import DemoBanner from './DemoBanner';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';

export default function AppLayout() {
  const location = useLocation();
  const { user } = useAuth();
  
  // Basic title extraction from path for header
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'Dashboard';
    if (path.startsWith('/attention')) return user?.role === 'teacher' ? 'My Action Items' : 'Attention Center';
    if (path.startsWith('/students/')) return 'Student 360';
    if (path.startsWith('/students')) return 'Students';
    if (path.startsWith('/attendance')) return 'Attendance';
    if (path.startsWith('/interventions')) return 'Interventions';
    if (path.startsWith('/assignments')) return 'Assignments';
    if (path.startsWith('/academics')) return 'Academics';
    if (path.startsWith('/fees')) return 'Tuition & Fees';
    if (path.startsWith('/communications')) return 'Communications';
    if (path.startsWith('/search')) return 'Search Results';
    if (path.startsWith('/case-study')) return 'Case Study';
    if (path.startsWith('/reports')) return 'Reports & Analytics';
    return 'NorthBridge One';
  };

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col">
          <Header title={getPageTitle()} />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
