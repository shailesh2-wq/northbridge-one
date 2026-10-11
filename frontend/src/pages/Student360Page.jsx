import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import StudentTimeline from '../components/student/StudentTimeline';
import AttendanceChart from '../components/student/AttendanceChart';
import AcademicChart from '../components/student/AcademicChart';
import SignalCard from '../components/signals/SignalCard';
import InterventionCard from '../components/intervention/InterventionCard';
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react';

export default function Student360Page() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.getStudent360(id);
        setStudent(response);
      } catch (error) {
        console.error("Error fetching student", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Student Profile...</div>;
  if (!student) return <div className="p-8 text-center text-red-500">Student not found</div>;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'academics', label: 'Academics' },
    { id: 'signals', label: 'Signals' },
    { id: 'interventions', label: 'Interventions' },
    { id: 'timeline', label: 'Timeline' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Profile Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-3xl">
            {student.overview?.first_name?.[0]}{student.overview?.last_name?.[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{student.overview?.first_name} {student.overview?.last_name}</h1>
                <p className="text-sm text-gray-500">ID: {student.overview?.id} • Grade {student.overview?.grade} • {student.overview?.section}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                student.overview?.status === 'at-risk' ? 'bg-red-100 text-red-800' :
                student.overview?.status === 'monitor' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {student.overview?.status?.toUpperCase() || 'ON-TRACK'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center text-sm text-gray-600"><Mail className="w-4 h-4 mr-2" /> {student.overview?.parent_email || 'student@northbridge.edu.sg'}</div>
              <div className="flex items-center text-sm text-gray-600"><Phone className="w-4 h-4 mr-2" /> {student.overview?.parent_phone || '+65 6123 4567'}</div>
              <div className="flex items-center text-sm text-gray-600"><Calendar className="w-4 h-4 mr-2" /> DOB: {student.overview?.date_of_birth}</div>
              <div className="flex items-center text-sm text-gray-600"><MapPin className="w-4 h-4 mr-2" /> {student.overview?.nationality || 'Singapore'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
              {tab.id === 'signals' && student.active_signals?.length > 0 && (
                <span className="ml-2 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">{student.active_signals.length}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                     <p className="text-sm text-gray-500">Attendance</p>
                     <p className="text-2xl font-bold">{student.attendance_summary?.current_rate ? student.attendance_summary.current_rate.toFixed(1) : 100}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                     <p className="text-sm text-gray-500">GPA</p>
                     <p className="text-2xl font-bold">{student.academics?.current_gpa || 'N/A'}</p>
                  </div>
               </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold mb-4">Recent Timeline</h3>
               <StudentTimeline events={student.timeline?.slice(0, 3)} />
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Attendance Trend (Last 12 Weeks)</h3>
            <AttendanceChart data={student.attendance_summary?.weekly_trend || []} />
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Current Grades by Subject</h3>
            <AcademicChart data={student.academics?.subjects || []} />
          </div>
        )}

        {activeTab === 'signals' && (
          <div className="space-y-4">
            {student.active_signals?.map(signal => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
            {(!student.active_signals || student.active_signals.length === 0) && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
                No active signals for this student.
              </div>
            )}
          </div>
        )}

        {activeTab === 'interventions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {student.interventions?.active?.map(inv => (
              <InterventionCard key={inv.id} intervention={inv} />
            ))}
            {(!student.interventions?.active || student.interventions.active.length === 0) && (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
                No active interventions recorded.
              </div>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <StudentTimeline events={student.timeline} />
          </div>
        )}
      </div>
    </div>
  );
}
