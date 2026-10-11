import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MetricCard from '../components/dashboard/MetricCard';
import AttentionCard from '../components/dashboard/AttentionCard';
import TrendChart from '../components/dashboard/TrendChart';
import { Users, AlertTriangle, ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrincipalDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.getPrincipalDashboard();
        setData(response);
      } catch (error) {
        console.error("Error fetching dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Error loading dashboard</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Principal Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">School-wide overview and urgent signals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard label="Overall Attendance" value={`${Math.round(data.attendance_trend * 100)}%`} trend="up" trendValue="+1.2%" icon={Activity} to="/attendance" />
        <MetricCard label="School-Wide Alerts" value={data.school_wide_alerts || 0} trend="down" trendValue="-5" icon={AlertTriangle} to="/attention" />
        <MetricCard label="Academic Concern Areas" value={data.academic_concern_areas || 0} trend="up" trendValue="+1" icon={Users} to="/academics" />
        <MetricCard label="Staffing Issues" value={data.staffing_issues || 0} trend="neutral" trendValue="Stable" icon={ShieldCheck} to="/staff-workload" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Attendance Trend (30 Days)</h2>
            </div>
            <div className="h-64">
              <TrendChart data={data.attendance_history || []} dataKey="rate" height={250} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
              <Link to="/events" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.upcoming_events?.map(evt => (
                    <tr key={evt.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{evt.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{new Date(evt.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {(!data.upcoming_events || data.upcoming_events.length === 0) && (
                    <tr>
                       <td colSpan="2" className="px-4 py-3 text-sm text-gray-500 text-center">No upcoming events.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Top Signals</h2>
              <Link to="/signals" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Attention Center
              </Link>
            </div>
            <div className="space-y-4">
              {data.recent_signals?.map(signal => (
                <AttentionCard key={signal.id} signal={signal} />
              ))}
              {(!data.recent_signals || data.recent_signals.length === 0) && (
                <div className="text-center py-6 text-gray-500 text-sm">No active signals. All clear!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 