import type { IReport, IUploadResponse } from '../types';
import { apiClient } from './api';

export const reportService = {
  uploadFile: async (file: File): Promise<IUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<IUploadResponse>('/reports/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getReports: async (): Promise<IReport[]> => {
    const response = await apiClient.get<IReport[]>('/reports');
    return response.data;
  },

  getReportById: async (id: string): Promise<IReport> => {
    const response = await apiClient.get<IReport>(`/reports/${id}`);
    return response.data;
  },

  deleteReport: async (id: string): Promise<void> => {
    await apiClient.delete(`/reports/${id}`);
  },
};
