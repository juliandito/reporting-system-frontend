import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, Table2 } from 'lucide-react';
import { useReportStore } from '../../store/useReportStore';
import { LoadingSpinner, Badge } from '../../components/ui';
import { ChartDisplay } from './components/ChartDisplay';
import { ROUTES } from '../../constants/RouteConstants';

export function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedReport, isLoading, fetchReportById } = useReportStore();

  useEffect(() => {
    if (id) fetchReportById(id);
  }, [id, fetchReportById]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!selectedReport) {
    return (
      <div className="text-center py-16">
        <BarChart3 size={48} className="mx-auto mb-4 text-base-content/30" />
        <p className="text-base-content/50">Report not found</p>
        <button className="btn btn-ghost mt-4" onClick={() => navigate(ROUTES.REPORTS)}>
          Back to Reports
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button className="btn btn-ghost btn-sm gap-1" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-neutral">{selectedReport.name}</h1>
            <Badge status={selectedReport.status} />
          </div>
          {selectedReport.description && (
            <p className="text-base-content/60 mt-1">{selectedReport.description}</p>
          )}
        </div>
      </div>

      {selectedReport.charts.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-base-300 rounded-2xl">
          <BarChart3 size={48} className="mx-auto mb-4 text-base-content/30" />
          <p className="text-base-content/50">No charts available for this report</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedReport.charts.map((chart) => (
            <ChartDisplay key={chart.id} chart={chart} />
          ))}
        </div>
      )}

      {selectedReport.processedData?.rows && selectedReport.processedData.rows.length > 0 && (
        <div className="card bg-base-100 border border-base-200 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <Table2 size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-neutral">Source Data</h2>
              <span className="badge badge-ghost badge-sm ml-1">
                {selectedReport.processedData.summary.total_rows} rows
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-zebra table-sm w-full">
                <thead>
                  <tr>
                    {selectedReport.processedData.summary.columns.map((col) => (
                      <th key={col} className="whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedReport.processedData.rows.map((row, i) => (
                    <tr key={i}>
                      {selectedReport.processedData!.summary.columns.map((col) => (
                        <td key={col}>{row[col] ?? '—'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
