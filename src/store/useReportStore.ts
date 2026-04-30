import { create } from 'zustand';
import { reportService } from '../services/report.service';
import type { IReport } from '../types';

interface ReportState {
  reports: IReport[];
  selectedReport: IReport | null;
  isLoading: boolean;
  error: string | null;
  fetchReports: () => Promise<void>;
  fetchReportById: (id: string) => Promise<void>;
  uploadReport: (file: File) => Promise<string>;
  deleteReport: (id: string) => Promise<void>;
  setSelectedReport: (report: IReport | null) => void;
  clearError: () => void;
}

export const useReportStore = create<ReportState>((set, get) => ({
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
      await get().fetchReports();
      set({ isLoading: false });
      return response.reportId;
    } catch (error) {
      set({ error: 'Failed to upload file', isLoading: false });
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
