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
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Attendance Overview</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">School-wide attendance metrics and anomalies.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <MetricCard label="Today's Attendance" value="94.2%" trend="up" trendValue="+0.5%" icon={Users} />
          <MetricCard label="Classes Below 90%" value="3" trend="down" trendValue="1 less" icon={AlertTriangle} />
          <MetricCard label="Weekly Trend" value="Stable" icon={TrendingUp} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Classes Requiring Review</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                  <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Rate Today</th>
                  <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Missing Students</th>
                  <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-900">Grade 8B</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-red-600 font-semibold">81.5%</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500">4</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500">Ms. Priya Sharma</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-900">Grade 9C</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-orange-600 font-semibold">86.2%</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500">3</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500">Mr. David Chen</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-900">Grade 11A</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-orange-600 font-semibold">88.9%</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500">2</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500">Dr. Sarah Lee</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role === 'parent') {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Attendance History</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Review Alex's attendance records.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm text-gray-900">Today</td>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap"><span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">Late</span></td>
                  <td className="px-4 sm:px-6 py-3.5 text-xs sm:text-sm text-gray-500">Arrived 15 mins late</td>
                </tr>
                <tr>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm text-gray-900">Yesterday</td>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap"><span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">Present</span></td>
                  <td className="px-4 sm:px-6 py-3.5 text-xs sm:text-sm text-gray-500"></td>
                </tr>
                <tr>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm text-gray-900">Monday, Oct 5</td>
                  <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap"><span className="px-2 py-0.5 bg-red-50 text-red-700 text-xs font-medium rounded-full">Absent</span></td>
                  <td className="px-4 sm:px-6 py-3.5 text-xs sm:text-sm text-gray-500">Excused: Medical</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Teacher or Default UI (Mark Attendance)
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="flex-1 sm:flex-none border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-blue-500 focus:border-blue-500 py-2 pl-3 pr-8 bg-white"
          >
            <option value="9A">Grade 9 - A</option>
            <option value="10A">Grade 10 - A</option>
            <option value="11B">Grade 11 - B</option>
          </select>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      </div>
      {showConfirm && (
        <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs sm:text-sm flex items-center">
          <Check className="w-4 h-4 mr-2 shrink-0" />
          Attendance saved successfully for {selectedClass}.
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="2" className="px-4 sm:px-6 py-8 text-center text-xs sm:text-sm text-gray-500">Loading students...</td></tr>
              ) : (
                students.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mr-3 shrink-0">
                          {student.first_name?.[0] || 'S'}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-medium text-gray-900">{student.first_name} {student.last_name}</div>
                          <div className="text-[11px] sm:text-xs text-gray-500">ID: {student.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button 
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md border text-xs sm:text-sm font-medium transition-colors ${
                            attendance[student.id] === 'present' ? 'bg-green-50 border-green-200 text-green-700 font-semibold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 shrink-0" /> Present
                        </button>
                        <button 
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md border text-xs sm:text-sm font-medium transition-colors ${
                            attendance[student.id] === 'absent' ? 'bg-red-50 border-red-200 text-red-700 font-semibold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 shrink-0" /> Absent
                        </button>
                        <button 
                          onClick={() => handleStatusChange(student.id, 'late')}
                          className={`flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md border text-xs sm:text-sm font-medium transition-colors ${
                            attendance[student.id] === 'late' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 font-semibold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 shrink-0" /> Late
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
    </div>
  );
}
