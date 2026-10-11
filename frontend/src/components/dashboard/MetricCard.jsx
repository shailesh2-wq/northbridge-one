import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MetricCard({ label, value, trend, trendValue, icon: Icon, to }) {
  const isPositive = trend === 'up';
  const isNeutral = trend === 'neutral';
  const isNegative = trend === 'down';

  const CardContent = (
    <div className={`bg-white rounded-xl border border-gray-200 p-5 shadow-sm ${to ? 'hover:shadow-md hover:border-blue-300 transition-all cursor-pointer' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        {Icon && (
          <div className="p-2 bg-gray-50 rounded-lg">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-semibold text-gray-900">{value}</div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${
            isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'
          }`}>
            {isPositive && <ArrowUpRight className="w-4 h-4 mr-1" />}
            {isNegative && <ArrowDownRight className="w-4 h-4 mr-1" />}
            {isNeutral && <Minus className="w-4 h-4 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );

  return to ? <Link to={to} className="block">{CardContent}</Link> : CardContent;
}
