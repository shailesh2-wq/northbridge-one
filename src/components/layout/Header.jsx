import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Header({ title, onToggleMobileMenu }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-3 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center min-w-0 mr-2 sm:mr-4">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 -ml-1 mr-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg lg:hidden transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-xl font-semibold text-text-primary truncate">
          {title || 'NorthBridge One'}
        </h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
        <form onSubmit={handleSearch} className="relative w-32 sm:w-56 md:w-80 lg:w-96">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 bg-surface-secondary border border-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-surface transition-colors"
          />
        </form>

        <button 
          className="relative p-1.5 sm:p-2 text-text-secondary hover:bg-surface-secondary rounded-full transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full border border-surface"></span>
        </button>

        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs sm:text-sm font-bold cursor-pointer shrink-0">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
}
