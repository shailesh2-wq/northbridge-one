import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AttentionCard from '../components/dashboard/AttentionCard';
import { Filter } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';

export default function AttentionCenterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const response = await api.getSignals({ role: user?.role, user_id: user?.id });
        setSignals(response);
      } catch (error) {
        console.error("Error fetching signals", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSignals();
  }, []);

  const handleAction = (signal) => {
    const type = signal.signal_type;
    const entity = signal.entity_type;
    const title = signal.title || '';
    
    if (type === 'teacher_workload' || type === 'high_workload' || entity === 'staff' || title.toLowerCase().includes('workload') || title.toLowerCase().includes('staff')) {
      navigate(signal.id ? `/staff-workload/${signal.id}` : '/staff-workload');
    } else if (entity === 'student' && signal.entity_id) {
      navigate(`/students/${signal.entity_id}`);
    } else if (entity === 'intervention' || type === 'unresolved_intervention' || type === 'attendance_followup_overdue') {
      navigate(`/interventions`);
    } else if (entity === 'fee' || type === 'fee_overdue') {
      navigate(`/fees`);
    } else if (entity === 'communication' || type === 'communication_pending') {
      navigate(`/communications`);
    } else if (type === 'assignment_incomplete') {
      navigate(`/assignments`);
    } else {
      navigate(`/students`);
    }
  };

  const filteredSignals = signals.filter(s => {
    if (filter === 'all') return true;
    return s.severity?.toLowerCase() === filter;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {user?.role === 'teacher' ? 'My Action Items' : 'Attention Center'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {user?.role === 'teacher' 
              ? 'Priority alerts and pending tasks for your classes.' 
              : 'Review and act on priority operational signals.'}
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-blue-500 focus:border-blue-500 py-1.5 sm:py-2 pl-3 pr-8"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 text-sm">Loading signals...</div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {filteredSignals.map(signal => (
            <AttentionCard key={signal.id} signal={signal} onAction={handleAction} />
          ))}
          {filteredSignals.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500 text-sm">
              No signals found for the selected filter.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
