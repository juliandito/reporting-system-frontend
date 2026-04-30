import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
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
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<SheetPreviewData | null>(null);

  const parsePreview = useCallback((f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<(string | number)[]>(worksheet, {
        header: 1,
      });
      const [headers, ...rows] = jsonData as (string | number)[][];
      setPreviewData({
        headers: headers?.map(String) ?? [],
        rows: rows.slice(0, 5),
        sheetName,
      });
    };
    reader.readAsBinaryString(f);
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
    try {
      const reportId = await uploadReport(file);
      navigate(ROUTES.REPORT_DETAIL.replace(':id', reportId));
    } catch {
      // error is handled in store
    }
  }, [file, uploadReport, navigate]);

  const handleReset = useCallback(() => {
    setFile(null);
    setPreviewData(null);
    clearError();
  }, [clearError]);

  return {
    file,
    previewData,
    isLoading,
    error,
    handleFileSelect,
    handleUpload,
    handleReset,
  };
}
