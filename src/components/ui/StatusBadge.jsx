import Badge from './Badge';

const statusMap = {
  open: { variant: 'warning', label: 'Open' },
  acknowledged: { variant: 'primary', label: 'Acknowledged' },
  investigating: { variant: 'primary', label: 'Investigating' },
  resolved: { variant: 'success', label: 'Resolved' },
  dismissed: { variant: 'default', label: 'Dismissed' },
  in_progress: { variant: 'primary', label: 'In Progress' },
  completed: { variant: 'success', label: 'Completed' },
  cancelled: { variant: 'default', label: 'Cancelled' },
};

export default function StatusBadge({ status, className }) {
  const config = statusMap[status] || { variant: 'default', label: status };
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
