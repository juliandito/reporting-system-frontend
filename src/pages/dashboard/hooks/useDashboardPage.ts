import { useEffect, useMemo } from 'react';
import { useReportStore } from '../../../store/useReportStore';
import type { IReport } from '../../../types';

export interface DashboardStats {
  totalReports: number;
  publishedReports: number;
  draftReports: number;
  totalCharts: number;
}

export function useDashboardPage() {
  const { reports, isLoading, fetchReports } = useReportStore();

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const stats: DashboardStats = useMemo(() => ({
    totalReports: reports.length,
    publishedReports: reports.filter((r) => r.status === 'published' || r.status === 'completed').length,
    draftReports: reports.filter((r) => r.status === 'draft' || r.status === 'processing').length,
    totalCharts: reports.reduce((acc, r) => acc + (r.charts?.length ?? 0), 0),
  }), [reports]);

  const recentReports: IReport[] = useMemo(
    () => [...reports].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    [reports]
  );

  return { stats, recentReports, isLoading };
}
