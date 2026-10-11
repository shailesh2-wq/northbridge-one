import { Link } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import { AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
      <EmptyState 
        icon={AlertCircle}
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        action={
          <Link to="/">
            <Button>Return to Dashboard</Button>
          </Link>
        }
      />
    </div>
  );
}
