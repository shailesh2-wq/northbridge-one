import React, { useEffect, useState } from 'react';
import api from '../services/api';
import StudentTimeline from '../components/student/StudentTimeline';
import MetricCard from '../components/dashboard/MetricCard';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

export default function ParentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // In a real app, parent would select student, or fetch for associated student
  const studentId = user?.associatedStudentId || '1'; 

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.getParentDashboard(studentId);
        setData(response);
      } catch (error) {
        console.error("Error fetching parent dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [studentId]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Student Info...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Error loading dashboard</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-2xl">
          {user?.name?.charAt(0) || 'P'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Today's Attendance</h3>
          <p className="text-lg font-semibold text-gray-900 mt-1 flex items-center capitalize">
            {data.attendance_today === 'present' ? (
               <><CheckCircle className="w-5 h-5 text-green-500 mr-2" /> {data.attendance_today}</>
            ) : (
               <><Clock className="w-5 h-5 text-yellow-500 mr-2" /> {data.attendance_today}</>
            )}
          </p>
        </div>
        <div className="text-right">
          <h3 className="text-sm font-medium text-gray-500">Fee Status</h3>
          <p className="text-base font-semibold text-gray-900 mt-1">{data.fee_status}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard label="Pending Assignments" value={data.pending_assignments?.length || 0} icon={BookOpen} to="/assignments" />
        <MetricCard label="Unread Messages" value={data.unread_messages_count || 0} icon={Clock} to="/communications" />
        <MetricCard label="Tuition & Fees" value={data.fee_status || "Check"} icon={CheckCircle} to="/fees" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Academic Updates</h2>
          <div className="space-y-4">
             {data.recent_academic_updates?.length > 0 ? (
                 data.recent_academic_updates.map((update, i) => (
                   <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                     <div>
                       <div className="font-medium text-gray-900">{update.subject}</div>
                       <div className="text-xs text-gray-500">{update.term} • {update.date}</div>
                     </div>
                     <div className={`text-sm font-bold ${update.grade < 70 ? 'text-red-600' : 'text-gray-900'}`}>
                       {update.grade}%
                     </div>
                   </div>
                 ))
             ) : (
                 <div className="text-sm text-gray-500">No recent updates</div>
             )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">School Announcements</h2>
          <div className="space-y-4">
             {data.school_announcements?.length > 0 ? (
                 data.school_announcements.map((ann, i) => (
                   <div key={i} className="flex flex-col border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                     <div className="font-medium text-gray-900">{ann.title}</div>
                     <div className="text-xs text-gray-500 mt-0.5">{ann.date}</div>
                   </div>
                 ))
             ) : (
                 <div className="text-sm text-gray-500">No announcements</div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
