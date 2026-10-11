import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Header({ title }) {
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
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-8 sticky top-[32px] z-30">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-text-primary">{title || 'NorthBridge One'}</h1>
      </div>

      <div className="flex items-center space-x-6">
        <form onSubmit={handleSearch} className="relative w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input 
            type="text" 
            placeholder="Search students, issues, actions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-surface transition-colors"
          />
        </form>

        <button className="relative p-2 text-text-secondary hover:bg-surface-secondary rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full border border-surface"></span>
        </button>

        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold cursor-pointer">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
}
