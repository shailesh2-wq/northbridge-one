import React, { useState } from 'react';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignalExplainer from './SignalExplainer';
import api from '../../services/api';

export default function SignalCard({ signal }) {
  const [status, setStatus] = useState(signal.status || 'open');

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await api.updateSignalStatus(signal.id, newStatus);
    } catch (error) {
      console.error("Failed to update status", error);
      setStatus(status);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`h-1 w-full ${signal.severity === 'critical' ? 'bg-red-500' : signal.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              signal.severity === 'critical' ? 'bg-red-100 text-red-800' :
              signal.severity === 'high' ? 'bg-orange-100 text-orange-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {signal.severity.toUpperCase()}
            </span>
            <span className="text-xs text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {signal.createdAt ? new Date(signal.createdAt).toLocaleDateString() : 'Just now'}
            </span>
          </div>
          <select 
            value={status}
            onChange={handleStatusChange}
            className={`px-2 py-1 rounded text-xs font-medium border cursor-pointer outline-none appearance-none ${
              status === 'open' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200'
            }`}
          >
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{signal.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{signal.description}</p>
        
        {signal.explanation && <SignalExplainer explanation={signal.explanation} />}
        
      </div>
    </div>
  );
}
