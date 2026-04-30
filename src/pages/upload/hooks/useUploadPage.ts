import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { readSheet, type CellValue } from 'read-excel-file/browser';
import { useReportStore } from '../../../store/useReportStore';
import { ROUTES } from '../../../constants/RouteConstants';

export interface SheetPreviewData {
  headers: string[];
  rows: (string | number)[][];
  sheetName: string;
}

export function useUploadPage() {
  const navigate = useNavigate();
  const { uploadReport, error, clearError, isLoading } = useReportStore();
  const templateId = import.meta.env.VITE_TEMPLATE_ID || import.meta.env.VITE_REPORT_TEMPLATE_ID || 'f277e07f-0788-4305-9adf-299aed73fb71';
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<SheetPreviewData | null>(null);

  const parsePreview = useCallback(async (f: File) => {
    try {
      const rows = await readSheet(f);
      const [headerRow, ...dataRows] = rows;
      setPreviewData({
        headers: (headerRow ?? []).map(String),
        rows: dataRows.slice(0, 5).map((row) =>
          row.map((cell: CellValue | null) =>
            cell instanceof Date ? cell.toLocaleDateString() : (cell as string | number) ?? ''
          )
        ),
        sheetName: f.name.replace(/\.[^.]+$/, ''),
      });
    } catch {
      // silently ignore parse errors — the file will still upload
    }
  }, []);

  const handleFileSelect = useCallback(
    (selectedFile: File) => {
      clearError();
      setFile(selectedFile);
      parsePreview(selectedFile);
    },
    [clearError, parsePreview]
  );

  const handleUpload = useCallback(async () => {
    if (!file) return;
    if (!templateId) return;
    try {
      const reportId = await uploadReport(file, templateId);
      navigate(ROUTES.REPORT_DETAIL.replace(':id', reportId));
    } catch {
      // error is handled in store
    }
  }, [file, uploadReport, templateId, navigate]);

  const handleReset = useCallback(() => {
    setFile(null);
    setPreviewData(null);
    clearError();
  }, [clearError]);

  return {
    file,
    previewData,
    templateId,
    isLoading,
    error,
    handleFileSelect,
    handleUpload,
    handleReset,
  };
}
