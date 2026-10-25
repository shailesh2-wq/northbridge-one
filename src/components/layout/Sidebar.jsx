import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';
import { 
  LayoutDashboard, AlertTriangle, Users, ClipboardCheck, 
  Shield, MessageSquare, BarChart3, BookOpen, Home, 
  GraduationCap, CreditCard, LogOut, X
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    const role = user?.role?.toLowerCase();
    
    if (role === 'principal' || role === 'administrator') {
      return [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Attention Center', path: '/attention', icon: AlertTriangle },
        { name: 'Students', path: '/students', icon: Users },
        { name: 'Attendance', path: '/attendance', icon: ClipboardCheck },
        { name: 'Interventions', path: '/interventions', icon: Shield },
        { name: 'Communications', path: '/communications', icon: MessageSquare },
        { name: 'Reports', path: '/reports', icon: BarChart3 }
      ];
    } else if (role === 'teacher') {
      return [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Students', path: '/students', icon: Users },
        { name: 'Attendance', path: '/attendance', icon: ClipboardCheck },
        { name: 'Assignments', path: '/assignments', icon: BookOpen },
        { name: 'Attention Items', path: '/attention', icon: AlertTriangle },
        { name: 'Messages', path: '/communications', icon: MessageSquare }
      ];
    } else if (role === 'parent') {
      return [
        { name: 'Home', path: '/dashboard', icon: Home },
        { name: 'Attendance', path: '/attendance', icon: ClipboardCheck },
        { name: 'Academics', path: '/academics', icon: GraduationCap },
        { name: 'Messages', path: '/communications', icon: MessageSquare },
        { name: 'Fees', path: '/fees', icon: CreditCard }
      ];
    } else if (role === 'finance manager') {
      return [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Fee Management', path: '/fees', icon: CreditCard },
        { name: 'Reports', path: '/reports', icon: BarChart3 }
      ];
    }
    return [{ name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }];
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside className={clsx(
        "w-64 bg-surface border-r border-border h-full flex flex-col fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <div className="p-5 flex items-center justify-between border-b border-border/60">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-sm">
              N
            </div>
            <span className="font-bold text-lg text-text-primary tracking-tight">NorthBridge One</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-secondary lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={clsx(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary-50 text-primary-700 font-semibold" 
                  : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
              )}
            >
              <item.icon className={clsx("w-5 h-5 mr-3 shrink-0", isActive ? "text-primary-600" : "text-text-tertiary")} />
              {item.name}
            </Link>
          );
        })}
        <div className="pt-4 mt-4 border-t border-border">
           <Link
              to="/case-study"
              onClick={onClose}
              className={clsx(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === '/case-study'
                  ? "bg-primary-50 text-primary-700 font-semibold" 
                  : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
              )}
            >
              <BookOpen className={clsx("w-5 h-5 mr-3 shrink-0", location.pathname === '/case-study' ? "text-primary-600" : "text-text-tertiary")} />
              Case Study
            </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold flex-shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-text-tertiary truncate">{user?.role || 'Guest'}</p>
            </div>
          </div>
          <button 
            onClick={() => { onClose?.(); logout(); }} 
            className="p-2 text-text-tertiary hover:text-danger-600 transition-colors rounded-lg hover:bg-danger-50" 
            title="Logout"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  </>
  );
}
