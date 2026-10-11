import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, AlertCircle, Clock } from 'lucide-react';

export default function StudentCard({ student }) {
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'at-risk': return 'bg-red-100 text-red-800';
      case 'monitor': return 'bg-yellow-100 text-yellow-800';
      case 'on-track': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/students/${student.id}`} className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
            {(student.first_name?.[0] || '') + (student.last_name?.[0] || '')}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">{student.first_name} {student.last_name}</h3>
            <p className="text-sm text-gray-500">Grade {student.grade} • {student.section || 'N/A'}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
          {student.status || 'Unknown'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-1">Attendance</p>
          <p className="text-sm font-semibold text-gray-900">{student.attendanceRate || '0'}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">GPA / Average</p>
          <p className="text-sm font-semibold text-gray-900">{student.gpa || student.academicAverage || 'N/A'}</p>
        </div>
      </div>
      
      {student.recentSignals > 0 && (
        <div className="mt-4 flex items-center text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4 mr-1.5" />
          {student.recentSignals} recent signals
        </div>
      )}
    </Link>
  );
}
