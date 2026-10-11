import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ActionItem({ title, subtitle, icon: Icon, onClick, status = 'pending' }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors text-left"
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`p-2 rounded-full ${status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </button>
  );
}
