import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DemoBanner from './DemoBanner';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';

export default function AppLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer whenever location/route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
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
    if (path.startsWith('/staff-workload')) return 'Staff Workload Details';
    return 'NorthBridge One';
  };

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col w-full overflow-x-hidden">
      <DemoBanner />
      <div className="flex flex-1 relative">
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
        <div className="flex-1 lg:ml-64 ml-0 flex flex-col min-w-0 w-full transition-all duration-300">
          <Header 
            title={getPageTitle()} 
            onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)} 
          />
          <main className="flex-1 p-3.5 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
