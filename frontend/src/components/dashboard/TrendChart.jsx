import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function TrendChart({ data, dataKey = 'value', color = '#3b82f6', height = 40 }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2} 
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
