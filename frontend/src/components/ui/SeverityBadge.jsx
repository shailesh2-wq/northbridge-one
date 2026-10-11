import clsx from 'clsx';

const severityMap = {
  critical: { bg: 'bg-danger-50', text: 'text-danger-700', dot: 'bg-danger-500', label: 'Critical' },
  high: { bg: 'bg-warning-50', text: 'text-warning-700', dot: 'bg-warning-500', label: 'High' },
  medium: { bg: 'bg-primary-50', text: 'text-primary-700', dot: 'bg-primary-500', label: 'Medium' },
  low: { bg: 'bg-surface-tertiary', text: 'text-text-secondary', dot: 'bg-text-tertiary', label: 'Low' },
};

export default function SeverityBadge({ severity, className }) {
  const config = severityMap[severity?.toLowerCase()] || severityMap.low;
  
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", config.bg, config.text, className)}>
      <span className={clsx("w-1.5 h-1.5 rounded-full mr-1.5", config.dot)}></span>
      {config.label}
    </span>
  );
}
