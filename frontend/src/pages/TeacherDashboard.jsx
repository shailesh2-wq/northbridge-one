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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Good morning, {user.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" /> Students Needing Attention
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.students_requiring_attention > 0 ? (
                <Link to="/attention" className="col-span-2 bg-yellow-50 rounded-lg p-6 flex items-center justify-center text-yellow-700 border border-yellow-200 hover:bg-yellow-100 hover:shadow-sm transition-all group">
                  <span className="font-medium">{data.students_requiring_attention} students require your attention. Check the Action Items.</span>
                </Link>
              ) : (
                <div className="col-span-2 bg-gray-50 rounded-lg p-6 text-center text-gray-500 border border-gray-200">
                  All your students are on track!
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" /> Today's Classes
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {data.today_classes?.length > 0 ? data.today_classes.map((cls, idx) => (
                <div key={idx} className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                    <p className="text-sm text-gray-500">{cls.time} • Room {cls.room}</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100">
                    Mark Attendance
                  </button>
                </div>
              )) : (
                 <div className="p-4 text-gray-500">No classes scheduled for today.</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CheckSquare className="w-5 h-5 mr-2 text-green-500" /> Pending Tasks
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <Link to="/assignments" className="p-4 border-b border-gray-100 hover:bg-gray-50 flex justify-between items-center text-gray-700 font-medium">
                <span>{data.pending_assignments_count} pending assignment submissions</span>
                <span className="text-blue-600 text-sm">View &rarr;</span>
              </Link>
              <Link to="/attention" className="p-4 hover:bg-gray-50 flex justify-between items-center text-gray-700 font-medium">
                <span>{data.action_items_count} action items requiring your review</span>
                <span className="text-blue-600 text-sm">View &rarr;</span>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-purple-500" /> Unread Messages
            </h2>
            <Link to="/communications" className="block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">{data.unread_messages_count} unread messages</span>
                <span className="text-blue-600 text-sm">View Inbox &rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
