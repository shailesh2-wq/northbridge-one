import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MetricCard from '../components/dashboard/MetricCard';
import { DollarSign, TrendingUp, CreditCard, AlertTriangle } from 'lucide-react';

export default function FinanceDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.getFinanceDashboard();
        setData(response);
      } catch (error) {
        console.error("Error fetching dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Finance Data...</div>;

  const totalAccounts = data?.total_outstanding_accounts || 0;
  const overdueCount = data?.overdue_count || 0;
  const pendingCount = data?.pending_count || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Financial Overview</h1>
      <p className="text-sm text-gray-500 mb-8">Fee collection status across all enrolled students.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard label="Total Outstanding" value={`$${(data?.outstanding_fees_total || 0).toLocaleString()}`} icon={DollarSign} to="/fees" />
        <MetricCard label="Outstanding Accounts" value={totalAccounts} icon={CreditCard} to="/fees" />
        <MetricCard label="Overdue Accounts" value={overdueCount} icon={AlertTriangle} to="/fees" />
        <MetricCard label="Collection Rate" value={`${Math.round((data?.collection_rate || 0) * 100)}%`} icon={TrendingUp} to="/reports" />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-800">
        <strong>${(data?.outstanding_fees_total || 0).toLocaleString()}</strong> total outstanding across <strong>{totalAccounts}</strong> accounts: {overdueCount} overdue (past due date) and {pendingCount} pending (upcoming due date).
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <h2 className="text-lg font-semibold text-gray-900 mb-4">Students With Overdue Fees</h2>
         <table className="min-w-full divide-y divide-gray-200">
             <thead>
               <tr>
                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount Due</th>
                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-200">
               {data?.students_with_overdue_fees?.map((tx, idx) => (
                 <tr key={idx}>
                   <td className="px-4 py-3 text-sm text-gray-900">STU-{tx.student_id}</td>
                   <td className="px-4 py-3 text-sm text-gray-900 font-semibold text-red-600">${tx.amount?.toLocaleString()}</td>
                   <td className="px-4 py-3 text-sm text-gray-500">{tx.due_date ? new Date(tx.due_date).toLocaleDateString() : 'N/A'}</td>
                 </tr>
               ))}
               {(!data?.students_with_overdue_fees || data.students_with_overdue_fees.length === 0) && (
                 <tr>
                    <td colSpan="3" className="px-4 py-3 text-sm text-center text-gray-500">No overdue fees found.</td>
                 </tr>
               )}
             </tbody>
         </table>
      </div>
    </div>
  );
}
