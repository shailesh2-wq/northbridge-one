import clsx from 'clsx';

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={clsx("flex flex-col items-center justify-center p-8 text-center bg-surface border border-border rounded-xl border-dashed", className)}>
      {Icon && <Icon className="w-12 h-12 text-text-tertiary mb-4" />}
      <h3 className="text-sm font-medium text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary mb-4 max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
