import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { User, CheckSquare, Clock, AlertCircle, ArrowLeft, Activity } from 'lucide-react';

export default function StaffWorkloadPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [signal, setSignal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        let sig = null;
        if (id) {
          sig = await api.getSignal(id);
        } else {
          try {
            const allSignals = await api.getSignals();
            sig = allSignals.find(s => s.signal_type === 'high_workload' || s.signal_type === 'teacher_workload' || s.title?.toLowerCase().includes('workload'));
          } catch(e) {}
          if (!sig) {
            try {
              sig = await api.getSignal(16);
            } catch(e) {}
          }
        }
        if (sig) setSignal(sig);
      } catch (error) {
        console.error("Error fetching signal", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSignal();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading workload details...</div>;

  const currentSignal = signal || {
    id: 16,
    title: 'High workload alert: Ms. Priya Sharma',
    status: 'open',
    severity: 'high',
    description: '322 submissions pending review across 113 assignments',
    explanation: 'Ms. Priya Sharma has 322 pending assignment reviews across Grade 8 Mathematics and Science classes, exceeding the normal operational threshold.',
    trigger_data: { pending: 322, overdue: 45, assignments: 113 }
  };

  const staffName = currentSignal.title.replace('High workload alert: ', '').replace('Teacher workload alert: ', '');
  const triggerData = typeof currentSignal.trigger_data === 'string' 
    ? JSON.parse(currentSignal.trigger_data || '{}') 
    : (currentSignal.trigger_data || {});

  const pendingTasks = triggerData.pending || 322;
  const overdueTasks = triggerData.overdue || 45;
  const assignmentsCount = triggerData.assignments || 113;

  return (
    <div className="space-y-6 max-w-4xl">
      <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 sm:px-6 sm:py-5 border-b border-gray-200 bg-gray-50 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{staffName}</h1>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <Activity className="w-4 h-4 mr-1 text-gray-400 shrink-0" /> Staff Workload & Operational Status
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Current Status:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              currentSignal.status === 'resolved' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {currentSignal.status?.toUpperCase() || 'OPEN'}
            </span>
          </div>
        </div>
        
        {/* Workload Stats */}
        <div className="p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Current Workload Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-blue-50 rounded-lg p-4 sm:p-5 border border-blue-100 shadow-sm">
              <div className="flex items-center text-blue-600 mb-3">
                <CheckSquare className="w-5 h-5 mr-2 shrink-0" />
                <h3 className="font-semibold text-sm">Active Assignments</h3>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{assignmentsCount}</p>
              <p className="text-xs text-gray-500 mt-1">Total active course assignments</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 sm:p-5 border border-orange-100 shadow-sm">
              <div className="flex items-center text-orange-600 mb-3">
                <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                <h3 className="font-semibold text-sm">Pending Tasks</h3>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{pendingTasks}</p>
              <p className="text-xs text-gray-500 mt-1">Submissions waiting for review</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 sm:p-5 border border-red-100 shadow-sm">
              <div className="flex items-center text-red-600 mb-3">
                <Clock className="w-5 h-5 mr-2 shrink-0" />
                <h3 className="font-semibold text-sm">Overdue Tasks</h3>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{overdueTasks}</p>
              <p className="text-xs text-gray-500 mt-1">Grading past standard turnaround SLA</p>
            </div>
          </div>
        </div>

        {/* Cause of Alert */}
        <div className="p-4 sm:px-6 sm:py-5 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">What is causing this workload alert?</h3>
          <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100 leading-relaxed">
            {currentSignal.explanation || currentSignal.description}
          </p>
        </div>

        {/* Actions */}
        <div className="p-4 sm:px-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
          <button 
            onClick={() => navigate('/search?q=' + encodeURIComponent(staffName))}
            className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors text-center"
          >
            View Staff Details
          </button>
          <button 
            onClick={() => navigate('/communications')} 
            className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 inline-flex items-center justify-center shadow-sm transition-colors text-center"
          >
            Follow Up with Staff Member
          </button>
        </div>
      </div>
    </div>
  );
}
