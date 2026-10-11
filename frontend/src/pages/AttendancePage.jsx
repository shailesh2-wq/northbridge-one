import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Save, Check, X, Clock, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MetricCard from '../components/dashboard/MetricCard';

export default function AttendancePage() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState('10A');
  const [attendance, setAttendance] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Mock fetch students for class
    const fetchClass = async () => {
      setLoading(true);
      try {
        const response = await api.getStudents(); // Replace with class specific call
        const clsStudents = response.slice(0, 10);
        setStudents(clsStudents);
        const initialMap = {};
        clsStudents.forEach(s => initialMap[s.id] = 'present');
        setAttendance(initialMap);
      } catch (e) {
        console.error(e);
      } finally {
         setLoading(false);
      }
    };
    fetchClass();
  }, [selectedClass]);

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.markAttendance({ class: selectedClass, date: new Date().toISOString(), records: attendance });
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    } catch (e) {
      console.error(e);
      alert('Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  if (user?.role === 'principal' || user?.role === 'administrator' || user?.role === 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Attendance Overview</h1>
          <p className="text-sm text-gray-500 mt-1">School-wide attendance metrics and anomalies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard label="Today's Attendance" value="94.2%" trend="up" trendValue="+0.5%" icon={Users} />
          <MetricCard label="Classes Below 90%" value="3" trend="down" trendValue="1 less" icon={AlertTriangle} />
          <MetricCard label="Weekly Trend" value="Stable" icon={TrendingUp} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Classes Requiring Review</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate Today</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Missing Students</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Grade 8B</td>
                <td className="px-4 py-3 text-sm text-red-600 font-semibold">81.5%</td>
                <td className="px-4 py-3 text-sm text-gray-500">4</td>
                <td className="px-4 py-3 text-sm text-gray-500">Ms. Priya Sharma</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Grade 9C</td>
                <td className="px-4 py-3 text-sm text-orange-600 font-semibold">86.2%</td>
                <td className="px-4 py-3 text-sm text-gray-500">3</td>
                <td className="px-4 py-3 text-sm text-gray-500">Mr. David Chen</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Grade 11A</td>
                <td className="px-4 py-3 text-sm text-orange-600 font-semibold">88.9%</td>
                <td className="px-4 py-3 text-sm text-gray-500">2</td>
                <td className="px-4 py-3 text-sm text-gray-500">Dr. Sarah Lee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (user?.role === 'parent') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Attendance History</h1>
          <p className="text-sm text-gray-500 mt-1">Review Alex's attendance records.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Today</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">Late</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">Arrived 15 mins late</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Yesterday</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">Present</span></td>
                <td className="px-6 py-4 text-sm text-gray-500"></td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Monday, Oct 5</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">Absent</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">Excused: Medical</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Teacher or Default UI (Mark Attendance)
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="9A">Grade 9 - A</option>
            <option value="10A">Grade 10 - A</option>
            <option value="11B">Grade 11 - B</option>
          </select>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      </div>
      {showConfirm && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm flex items-center">
          <Check className="w-4 h-4 mr-2" />
          Attendance saved successfully for {selectedClass}.
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="2" className="px-6 py-8 text-center text-gray-500">Loading students...</td></tr>
            ) : (
              students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mr-3">
                        {student.first_name?.[0] || 'S'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.first_name} {student.last_name}</div>
                        <div className="text-xs text-gray-500">ID: {student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleStatusChange(student.id, 'present')}
                        className={`flex items-center px-3 py-1.5 rounded border text-sm font-medium transition-colors ${
                          attendance[student.id] === 'present' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Check className="w-4 h-4 mr-1" /> Present
                      </button>
                      <button 
                        onClick={() => handleStatusChange(student.id, 'absent')}
                        className={`flex items-center px-3 py-1.5 rounded border text-sm font-medium transition-colors ${
                          attendance[student.id] === 'absent' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <X className="w-4 h-4 mr-1" /> Absent
                      </button>
                      <button 
                        onClick={() => handleStatusChange(student.id, 'late')}
                        className={`flex items-center px-3 py-1.5 rounded border text-sm font-medium transition-colors ${
                          attendance[student.id] === 'late' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Clock className="w-4 h-4 mr-1" /> Late
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
