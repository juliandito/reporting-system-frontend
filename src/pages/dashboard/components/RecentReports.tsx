import { useNavigate } from 'react-router-dom';
import { FileBarChart2, ArrowRight } from 'lucide-react';
import type { IReport } from '../../../types';
import { Badge } from '../../../components/ui';
import { ROUTES } from '../../../constants/RouteConstants';

interface RecentReportsProps {
  reports: IReport[];
}

export function RecentReports({ reports }: RecentReportsProps) {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-base">Recent Reports</h2>
          <button
            className="btn btn-ghost btn-xs gap-1"
            onClick={() => navigate(ROUTES.REPORTS)}
          >
            View all <ArrowRight size={14} />
          </button>
        </div>

        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-base-content/40">
            <FileBarChart2 size={40} className="mb-2" />
            <p className="text-sm">No reports yet</p>
          </div>
        ) : (
          <div className="space-y-2 mt-2">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors"
                onClick={() =>
                  navigate(ROUTES.REPORT_DETAIL.replace(':id', report.id))
                }
              >
                <div className="flex items-center gap-3">
                  <FileBarChart2 size={18} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <p className="text-xs text-base-content/50">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge status={report.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
