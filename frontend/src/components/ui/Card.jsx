import clsx from 'clsx';

export default function Card({ children, className, ...props }) {
  return (
    <div className={clsx("bg-surface border border-border rounded-xl shadow-sm overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={clsx("px-6 py-4 border-b border-border bg-surface-secondary", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={clsx("text-lg font-semibold text-text-primary", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={clsx("p-6", className)}>
      {children}
    </div>
  );
}
