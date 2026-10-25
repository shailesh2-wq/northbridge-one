import React, { useEffect, useState } from 'react';
import api from '../services/api';
import StudentCard from '../components/student/StudentCard';
import ActionItem from '../components/dashboard/ActionItem';
import { useAuth } from '../contexts/AuthContext';
import { Users, Calendar, CheckSquare, MessageSquare } from 'lucide-react';

import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.getTeacherDashboard(user.id);
        setData(response);
      } catch (error) {
        console.error("Error fetching dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchDashboard();
  }, [user?.id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Error loading dashboard</div>;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Good morning, {user.name}</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Your daily schedule and priority action items.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" /> Students Needing Attention
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.students_requiring_attention > 0 ? (
                <Link to="/attention" className="col-span-2 bg-yellow-50 rounded-xl p-5 sm:p-6 flex items-center justify-center text-yellow-800 border border-yellow-200 hover:bg-yellow-100 hover:shadow-sm transition-all group text-center">
                  <span className="font-medium text-sm sm:text-base">{data.students_requiring_attention} students require your attention. Check the Action Items.</span>
                </Link>
              ) : (
                <div className="col-span-2 bg-gray-50 rounded-xl p-6 text-center text-gray-500 border border-gray-200 text-sm">
                  All your students are on track!
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" /> Today's Classes
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {data.today_classes?.length > 0 ? data.today_classes.map((cls, idx) => (
                <div key={idx} className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900">{cls.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{cls.time} • Room {cls.room}</p>
                  </div>
                  <Link to="/attendance" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 text-blue-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-100 text-center shrink-0">
                    Mark Attendance
                  </Link>
                </div>
              )) : (
                 <div className="p-4 text-gray-500 text-sm">No classes scheduled for today.</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <CheckSquare className="w-5 h-5 mr-2 text-green-500" /> Pending Tasks
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <Link to="/assignments" className="p-4 border-b border-gray-100 hover:bg-gray-50 flex justify-between items-center text-gray-700 font-medium text-sm">
                <span className="truncate pr-2">{data.pending_assignments_count} pending assignment submissions</span>
                <span className="text-blue-600 shrink-0">View &rarr;</span>
              </Link>
              <Link to="/attention" className="p-4 hover:bg-gray-50 flex justify-between items-center text-gray-700 font-medium text-sm">
                <span className="truncate pr-2">{data.action_items_count} action items requiring your review</span>
                <span className="text-blue-600 shrink-0">View &rarr;</span>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-purple-500" /> Unread Messages
            </h2>
            <Link to="/communications" className="block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 font-medium">{data.unread_messages_count} unread messages</span>
                <span className="text-blue-600 font-medium">View Inbox &rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
