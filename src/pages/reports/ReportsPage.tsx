import { useReportsPage } from './hooks/useReportsPage';
import { ReportTable } from './components/ReportTable';
import { DeleteReportModal } from './components/DeleteReportModal';
import { LoadingSpinner } from '../../components/ui';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/RouteConstants';

export function ReportsPage() {
  const navigate = useNavigate();
  const {
    reports,
    isLoading,
    deleteTarget,
    isDeleting,
    handleDeleteRequest,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useReportsPage();

  if (isLoading && reports.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral">Reports</h1>
          <p className="text-base-content/60 mt-1">Manage your generated reports</p>
        </div>
        <button
          className="btn btn-primary gap-2"
          onClick={() => navigate(ROUTES.UPLOAD)}
        >
          <Upload size={18} />
          Upload New
        </button>
      </div>

      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body p-0">
          <ReportTable
            reports={reports}
            isLoading={isLoading}
            onDelete={handleDeleteRequest}
          />
        </div>
      </div>

      <DeleteReportModal
        isOpen={!!deleteTarget}
        reportName={deleteTarget?.name ?? ''}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
