import { useNavigate } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import type { IReport } from '../../../types';
import { Table, Badge } from '../../../components/ui';
import type { TableColumn } from '../../../components/ui';
import { ROUTES } from '../../../constants/RouteConstants';

interface ReportTableProps {
  reports: IReport[];
  isLoading: boolean;
  onDelete: (report: IReport) => void;
}

export function ReportTable({ reports, isLoading, onDelete }: ReportTableProps) {
  const navigate = useNavigate();

  const columns: TableColumn<IReport>[] = [
    {
      key: 'name',
      header: 'Report Name',
      render: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: 'charts',
      header: 'Charts',
      render: (row) => <span className="badge badge-outline">{row.charts?.length ?? 0}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <Badge status={row.status} />,
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (row) => (
        <span className="text-sm text-base-content/60">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (row) => (
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-ghost btn-xs gap-1"
            onClick={() => navigate(ROUTES.REPORT_DETAIL.replace(':id', row.id))}
          >
            <Eye size={14} /> View
          </button>
          <button
            className="btn btn-ghost btn-xs text-error gap-1"
            onClick={() => onDelete(row)}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={reports}
      keyExtractor={(r) => r.id}
      isLoading={isLoading}
      emptyMessage="No reports found. Upload an Excel file to get started."
    />
  );
}
