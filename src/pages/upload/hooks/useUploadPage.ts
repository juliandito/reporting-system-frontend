import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { readSheet, type CellValue } from 'read-excel-file/browser';
import { useReportStore } from '../../../store/useReportStore';
import { ROUTES } from '../../../constants/RouteConstants';
import type { IWizardChartConfig } from '../../../types';

export interface SheetPreviewData {
  headers: string[];
  rows: (string | number)[][];
  sheetName: string;
}

export type WizardStep = 1 | 2 | 3 | 4;

const DEFAULT_CHART: Omit<IWizardChartConfig, 'x_axis' | 'y_axis'> & { x_axis: string; y_axis: string } = {
  title: 'New Chart',
  type: 'bar',
  x_axis: '',
  y_axis: '',
  aggregation: 'sum',
};

export function useUploadPage() {
  const navigate = useNavigate();
  const { uploadReport, generateReport, error, clearError, isLoading } = useReportStore();

  const [step, setStep] = useState<WizardStep>(1);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<SheetPreviewData | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [charts, setCharts] = useState<IWizardChartConfig[]>([]);
  const [activeChartIndex, setActiveChartIndex] = useState<number | null>(null);

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

  // Step 1 → 2: Select file (local parse only, no API)
  const handleFileSelect = useCallback(
    (selectedFile: File) => {
      clearError();
      setFile(selectedFile);
      parsePreview(selectedFile);
      setStep(2);
    },
    [clearError, parsePreview]
  );

  // Step 2 → 3: Upload file to API, get reportId + columns
  const handleNextToChartBuilder = useCallback(async () => {
    if (!file) return;
    try {
      const result = await uploadReport(file);
      setReportId(result.reportId);
      setColumns(result.columns);
      setTemplateName(file.name.replace(/\.[^.]+$/, ''));
      setStep(3);
    } catch {
      // error is handled in store
    }
  }, [file, uploadReport]);

  // Chart builder handlers
  const handleAddChart = useCallback(() => {
    setCharts((prev) => {
      const next = [...prev, { ...DEFAULT_CHART }];
      setActiveChartIndex(next.length - 1);
      return next;
    });
  }, []);

  const handleUpdateChart = useCallback((index: number, partial: Partial<IWizardChartConfig>) => {
    setCharts((prev) => prev.map((c, i) => (i === index ? { ...c, ...partial } : c)));
  }, []);

  const handleRemoveChart = useCallback((index: number) => {
    setCharts((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next;
    });
    setActiveChartIndex((prev) => {
      if (prev === null) return null;
      if (prev === index) return null;
      if (prev > index) return prev - 1;
      return prev;
    });
  }, []);

  const handleSetActiveChart = useCallback((index: number) => {
    setActiveChartIndex(index);
  }, []);

  // Step 3 → 4: Generate report
  const handleGenerate = useCallback(async () => {
    if (!reportId || charts.length === 0) return;
    setStep(4);
    try {
      const id = await generateReport(reportId, {
        template_name: templateName || undefined,
        charts,
      });
      navigate(ROUTES.REPORT_DETAIL.replace(':id', id));
    } catch {
      // error handled in store; go back to step 3
      setStep(3);
    }
  }, [reportId, charts, templateName, generateReport, navigate]);

  // Reset all state
  const handleReset = useCallback(() => {
    setStep(1);
    setFile(null);
    setPreviewData(null);
    setReportId(null);
    setColumns([]);
    setTemplateName('');
    setCharts([]);
    setActiveChartIndex(null);
    clearError();
  }, [clearError]);

  const handleBackToPreview = useCallback(() => {
    setStep(2);
    clearError();
  }, [clearError]);

  return {
    step,
    file,
    previewData,
    reportId,
    columns,
    templateName,
    charts,
    activeChartIndex,
    isLoading,
    error,
    handleFileSelect,
    handleNextToChartBuilder,
    handleAddChart,
    handleUpdateChart,
    handleRemoveChart,
    handleSetActiveChart,
    handleGenerate,
    handleReset,
    handleBackToPreview,
    setTemplateName,
  };
}
