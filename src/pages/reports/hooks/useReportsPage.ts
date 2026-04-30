import { useEffect, useState, useCallback } from 'react';
import { useReportStore } from '../../../store/useReportStore';
import type { IReport } from '../../../types';

export function useReportsPage() {
  const { reports, isLoading, fetchReports, deleteReport } = useReportStore();
  const [deleteTarget, setDeleteTarget] = useState<IReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleDeleteRequest = useCallback((report: IReport) => {
    setDeleteTarget(report);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await deleteReport(deleteTarget.id);
    setIsDeleting(false);
    setDeleteTarget(null);
  }, [deleteTarget, deleteReport]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  return {
    reports,
    isLoading,
    deleteTarget,
    isDeleting,
    handleDeleteRequest,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
}
