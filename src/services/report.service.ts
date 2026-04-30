import axios from 'axios';
import type { IReport, IUploadResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
