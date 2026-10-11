import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MetricCard from '../components/dashboard/MetricCard';
import { Settings, Users, Database, Shield, AlertTriangle, Activity, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.getAdminDashboard();
        setData(response);
      } catch (error) {
        console.error("Error fetching dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading System Data...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">System Administration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard label="Unresolved Operational Issues" value={data?.unresolved_operational_issues || 0} icon={AlertTriangle} to="/attention" />
        <MetricCard label="Students Requiring Follow-up" value={data?.students_requiring_followup || 0} icon={Users} to="/students" />
        <MetricCard label="Attendance Anomalies" value={data?.attendance_anomalies || 0} icon={Activity} to="/attendance" />
        <MetricCard label="Pending Approvals" value={data?.pending_approvals || 0} icon={ShieldCheck} to="/interventions" />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Administrative Events</h2>
         <div className="text-sm text-gray-600 space-y-2">
            {data?.recent_events?.map((evt, i) => (
               <div key={i} className="flex justify-between p-3 bg-gray-50 rounded border border-gray-100">
                 <span className="font-medium text-gray-800">{evt.title}</span>
                 <span className="text-gray-500">{new Date(evt.date).toLocaleDateString()}</span>
               </div>
            )) || <div className="p-4 bg-gray-50 rounded">No recent events.</div>}
         </div>
      </div>
    </div>
  );
}
