import React from 'react';
import { Calendar, CheckSquare, Clock, User, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InterventionCard({ intervention }) {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'OPEN';
      case 'in_progress': return 'IN PROGRESS';
      case 'completed': return 'COMPLETED';
      case 'cancelled': return 'CANCELLED';
      default: return (status || 'UNKNOWN').toUpperCase();
    }
  };

  const dueDate = intervention.dueDate || intervention.due_date;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(intervention.status)}`}>
          {getStatusLabel(intervention.status)}
        </span>
        {dueDate && (
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            Due: {new Date(dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
      
      <h3 className="text-base font-semibold text-gray-900 mb-1">{intervention.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{intervention.description}</p>
      
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-600">
          <User className="w-3.5 h-3.5 mr-1 text-gray-400 shrink-0" />
          <span className="truncate max-w-[120px]">{intervention.studentName || `Student #${intervention.student_id}`}</span>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <CheckSquare className="w-3.5 h-3.5 mr-1 text-gray-400 shrink-0" />
          <span>Owner: {intervention.assigned_to ? (intervention.assignedToName || `Staff #${intervention.assigned_to}`) : 'Unassigned'}</span>
        </div>
      </div>
    </div>
  );
}
