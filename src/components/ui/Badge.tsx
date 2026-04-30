import type { TReportStatus } from '../../types';

interface BadgeProps {
  status: TReportStatus;
  label?: string;
}

const statusConfig: Record<TReportStatus, { className: string; label: string }> = {
  draft: { className: 'badge-warning', label: 'Draft' },
  published: { className: 'badge-success', label: 'Published' },
  archived: { className: 'badge-neutral', label: 'Archived' },
};

export function Badge({ status, label }: BadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`badge ${config.className}`}>
      {label ?? config.label}
    </span>
  );
}
