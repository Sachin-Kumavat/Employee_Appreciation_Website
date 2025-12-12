import { AchievementStatus } from '../../types';

interface StatusBadgeProps {
  status: AchievementStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    draft: 'bg-gray-100 text-gray-700 border-gray-200',
    submitted: 'bg-blue-100 text-blue-700 border-blue-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    approved: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
  };

  const labels = {
    draft: 'Draft',
    submitted: 'Submitted',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
