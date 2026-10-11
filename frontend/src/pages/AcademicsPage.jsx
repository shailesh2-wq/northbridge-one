import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, TrendingDown, TrendingUp, BookOpen } from 'lucide-react';

export default function AcademicsPage() {
  const { user } = useAuth();

  const subjects = [
    { name: 'Mathematics', teacher: 'Ms. Priya Sharma', score: 62, prevScore: 78, grade: 'D', trend: 'down' },
    { name: 'Science', teacher: 'Ms. Priya Sharma', score: 85, prevScore: 82, grade: 'B', trend: 'up' },
    { name: 'English Literature', teacher: 'Mr. David Chen', score: 92, prevScore: 90, grade: 'A', trend: 'up' },
    { name: 'World History', teacher: 'Mrs. Sarah Lee', score: 88, prevScore: 88, grade: 'B+', trend: 'flat' },
    { name: 'Physical Education', teacher: 'Mr. Marcus Johnson', score: 95, prevScore: 95, grade: 'A', trend: 'flat' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Academic Performance</h1>
        <p className="text-sm text-gray-500 mt-1">Review Alex's current grades and term progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
          <GraduationCap className="w-8 h-8 text-blue-500 mb-2" />
          <div className="text-sm text-gray-500 font-medium">Current GPA</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">3.1</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
          <BookOpen className="w-8 h-8 text-green-500 mb-2" />
          <div className="text-sm text-gray-500 font-medium">Total Credits</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">24.0</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
          <TrendingDown className="w-8 h-8 text-orange-500 mb-2" />
          <div className="text-sm text-gray-500 font-medium">Areas of Concern</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">1</div>
          <div className="text-xs text-orange-600 mt-1">Mathematics</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Term 3 Grades</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subjects.map((sub, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.teacher}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-semibold ${sub.score < 70 ? 'text-red-600' : 'text-gray-900'}`}>
                    {sub.score}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    sub.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                    sub.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {sub.grade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {sub.trend === 'up' ? <TrendingUp className="w-5 h-5 text-green-500" /> :
                   sub.trend === 'down' ? <TrendingDown className="w-5 h-5 text-red-500" /> :
                   <span className="text-gray-400 text-sm">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
