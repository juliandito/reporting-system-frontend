import { useNavigate } from 'react-router-dom';
import { Upload, FileBarChart2 } from 'lucide-react';
import { ROUTES } from '../../constants/RouteConstants';
import { LoadingSpinner } from '../../components/ui';
import { useDashboardPage } from './hooks/useDashboardPage';
import { DashboardStats } from './components/DashboardStats';
import { RecentReports } from './components/RecentReports';

export function DashboardPage() {
  const navigate = useNavigate();
  const { stats, recentReports, isLoading } = useDashboardPage();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral">Dashboard</h1>
        <p className="text-base-content/60 mt-1">
          Overview of your reporting data
        </p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentReports reports={recentReports} />
        </div>
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-base">Quick Actions</h2>
            <div className="space-y-3 mt-2">
              <button
                className="btn btn-primary w-full gap-2"
                onClick={() => navigate(ROUTES.UPLOAD)}
              >
                <Upload size={18} />
                Upload Excel File
              </button>
              <button
                className="btn btn-outline w-full gap-2"
                onClick={() => navigate(ROUTES.REPORTS)}
              >
                <FileBarChart2 size={18} />
                View All Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
