import { Outlet } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3 text-primary">
          <BarChart3 size={32} className="text-secondary" />
          <div className="text-center">
            <p className="text-lg font-bold leading-tight">BPH Migas</p>
            <p className="text-sm text-base-content/60">Reporting System</p>
          </div>
        </div>

        <div className="card bg-white shadow-lg border border-base-300">
          <div className="card-body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
