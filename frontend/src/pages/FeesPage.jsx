import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Download, CheckCircle, AlertCircle, DollarSign, PieChart } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';

export default function FeesPage() {
  const { user } = useAuth();

  if (user?.role === 'finance manager' || user?.role === 'finance' || user?.role === 'administrator' || user?.role === 'principal') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
            <p className="text-sm text-gray-500 mt-1">School-wide tuition collection and outstanding balances.</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard label="Total Collected (Term 3)" value="$1.2M" trend="up" trendValue="+5%" icon={DollarSign} />
          <MetricCard label="Outstanding Fees" value="$84,500" trend="down" trendValue="-12%" icon={PieChart} />
          <MetricCard label="Overdue Invoices" value="42" trend="down" trendValue="5 resolved" icon={AlertCircle} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Overdue Accounts</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Emma Watson (10A)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Term 2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$4,500</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    45 days
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer">Send Reminder</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Liam Smith (8B)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Term 3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$4,500</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    15 days
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer">Send Reminder</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Parent UI
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tuition & Fees</h1>
        <p className="text-sm text-gray-500 mt-1">Manage payments and view billing history for Alex.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Term 3 Tuition</h2>
            <p className="text-sm text-gray-500 mt-1">Due Date: Oct 1, 2026</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">$4,500.00</div>
              <div className="flex items-center text-sm font-medium text-green-600 mt-1 justify-end">
                <CheckCircle className="w-4 h-4 mr-1" /> Paid in full
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              View Receipt
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sep 28, 2026</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Term 3 Tuition</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$4,500.00</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jun 15, 2026</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Term 2 Tuition</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$4,500.00</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mar 10, 2026</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Term 1 Tuition</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$4,500.00</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Paid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
