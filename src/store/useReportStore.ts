import { create } from 'zustand';
import { reportService } from '../services/report.service';
import type { IGenerateReportRequest, IReport } from '../types';

interface ReportState {
  reports: IReport[];
  selectedReport: IReport | null;
  isLoading: boolean;
  error: string | null;
  fetchReports: () => Promise<void>;
  fetchReportById: (id: string) => Promise<void>;
  uploadReport: (file: File) => Promise<{ reportId: string; columns: string[] }>;
  generateReport: (id: string, config: IGenerateReportRequest) => Promise<string>;
  deleteReport: (id: string) => Promise<void>;
  setSelectedReport: (report: IReport | null) => void;
  clearError: () => void;
}

export const useReportStore = create<ReportState>((set) => ({
  reports: [],
  selectedReport: null,
  isLoading: false,
  error: null,

  fetchReports: async () => {
    set({ isLoading: true, error: null });
    try {
      const reports = await reportService.getReports();
      set({ reports, isLoading: false });
    } catch {
      set({ error: 'Failed to fetch reports', isLoading: false });
    }
  },

  fetchReportById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const report = await reportService.getReportById(id);
      set({ selectedReport: report, isLoading: false });
    } catch {
      set({ error: 'Failed to fetch report', isLoading: false });
    }
  },

  uploadReport: async (file: File) => {
    set({ isLoading: true, error: null });
    try {
      const response = await reportService.uploadFile(file);
      if (!response.reportId) {
        throw new Error('Missing report id in upload response');
      }
      set({ isLoading: false });
      return { reportId: response.reportId, columns: response.columns };
    } catch (error) {
      set({ error: 'Failed to upload file', isLoading: false });
      throw error;
    }
  },

  generateReport: async (id: string, config: IGenerateReportRequest) => {
    set({ isLoading: true, error: null });
    try {
      const report = await reportService.generateReport(id, config);
      set((state) => ({
        reports: [report, ...state.reports.filter((r) => r.id !== report.id)],
        isLoading: false,
      }));
      return report.id;
    } catch (error) {
      set({ error: 'Failed to generate report', isLoading: false });
      throw error;
    }
  },

  deleteReport: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await reportService.deleteReport(id);
      set((state) => ({
        reports: state.reports.filter((r) => r.id !== id),
        isLoading: false,
      }));
    } catch {
      set({ error: 'Failed to delete report', isLoading: false });
    }
  },

  setSelectedReport: (report) => set({ selectedReport: report }),
  clearError: () => set({ error: null }),
}));
