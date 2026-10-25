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
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Financial Overview</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Fee collection status across all enrolled students.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard label="Total Outstanding" value={`$${(data?.outstanding_fees_total || 0).toLocaleString()}`} icon={DollarSign} to="/fees" />
        <MetricCard label="Outstanding Accounts" value={totalAccounts} icon={CreditCard} to="/fees" />
        <MetricCard label="Overdue Accounts" value={overdueCount} icon={AlertTriangle} to="/fees" />
        <MetricCard label="Collection Rate" value={`${Math.round((data?.collection_rate || 0) * 100)}%`} icon={TrendingUp} to="/reports" />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs sm:text-sm text-blue-800 leading-relaxed">
        <strong>${(data?.outstanding_fees_total || 0).toLocaleString()}</strong> total outstanding across <strong>{totalAccounts}</strong> accounts: {overdueCount} overdue (past due date) and {pendingCount} pending (upcoming due date).
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
         <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Students With Overdue Fees</h2>
         <div className="overflow-x-auto">
           <table className="min-w-full divide-y divide-gray-200">
               <thead>
                 <tr>
                   <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                   <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Amount Due</th>
                   <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                 {data?.students_with_overdue_fees?.map((tx, idx) => (
                   <tr key={idx}>
                     <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900">STU-{tx.student_id}</td>
                     <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-red-600">${tx.amount?.toLocaleString()}</td>
                     <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500">{tx.due_date ? new Date(tx.due_date).toLocaleDateString() : 'N/A'}</td>
                   </tr>
                 ))}
                 {(!data?.students_with_overdue_fees || data.students_with_overdue_fees.length === 0) && (
                   <tr>
                      <td colSpan="3" className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-center text-gray-500">No overdue fees found.</td>
                   </tr>
                 )}
               </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
