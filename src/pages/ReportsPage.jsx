import React from 'react';
import { BarChart, FileText, Download, TrendingUp, AlertTriangle, Users } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { id: 1, title: 'Weekly Attendance Summary', category: 'Attendance', date: 'Oct 6, 2026', type: 'PDF' },
    { id: 2, title: 'Term 3 Academic Performance Overview', category: 'Academics', date: 'Oct 1, 2026', type: 'Excel' },
    { id: 3, title: 'Student Intervention Outcomes', category: 'Operations', date: 'Sep 28, 2026', type: 'PDF' },
    { id: 4, title: 'Fee Collection Status Report', category: 'Finance', date: 'Sep 25, 2026', type: 'Excel' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Generate and download institutional reports.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <BarChart className="w-4 h-4 mr-2" /> Generate Custom Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Avg School Attendance</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">94.2%</h3>
            <p className="text-xs text-green-600 mt-1 flex items-center">
              +1.2% from last month
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Interventions</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">42</h3>
            <p className="text-xs text-orange-600 mt-1 flex items-center">
              12 resolving this week
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Enrollment</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">1,240</h3>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              Across 48 sections
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Where is attention needed?</h2>
          <p className="text-sm text-gray-500">Based on recent data trends.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="p-6">
            <h3 className="font-medium text-gray-900 mb-2">Grade 8 (Simulated Example)</h3>
            <p className="text-sm text-gray-600 mb-4">Example: Mathematics averages dropped by 8% in Term 3 across all sections.</p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Review Grade 8 Academics &rarr;</button>
          </div>
          <div className="p-6">
            <h3 className="font-medium text-gray-900 mb-2">Grade 10B (Simulated Example)</h3>
            <p className="text-sm text-gray-600 mb-4">Example: Attendance rate fell below 90% threshold for the past 2 weeks.</p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Review 10B Attendance &rarr;</button>
          </div>
          <div className="p-6">
            <h3 className="font-medium text-gray-900 mb-2">Science Dept (Simulated Example)</h3>
            <p className="text-sm text-gray-600 mb-4">Example: High volume of pending assignments (&gt;200) indicating potential workload bottleneck.</p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Review Staff Workload &rarr;</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {reports.map(report => (
            <li key={report.id} className="p-6 hover:bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{report.category} • Generated on {report.date}</p>
                </div>
              </div>
              <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                <Download className="w-4 h-4 mr-1" /> Download {report.type}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
