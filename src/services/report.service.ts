import type {
  IApiChart,
  IGenerateReportRequest,
  IReport,
  IReportApiItem,
  IReportDetailResponse,
  IReportListResponse,
  IUploadApiResponse,
  IUploadWithColumnsResponse,
  TReportStatus,
} from '../types';
import { apiClient } from './api';

const REPORTS_ENDPOINT = '/v1/reports';

const normalizeStatus = (status: string): TReportStatus => {
  const value = status.toLowerCase();
  if (value === 'draft' || value === 'published' || value === 'archived' || value === 'completed' || value === 'processing' || value === 'failed') {
    return value;
  }
  return 'draft';
};

const mapChart = (chart: IApiChart) => ({
  id: chart.id,
  type: chart.type,
  title: chart.title,
  labels: chart.labels,
  datasets: chart.datasets.map((dataset) => ({
    name: dataset.name,
    data: dataset.data,
  })),
});

const mapReport = (report: IReportApiItem): IReport => {
  const chartCount =
    report.chart_definition?.length ?? report.processed_data?.charts?.length ?? 0;
  const derivedStatus: TReportStatus = report.status
    ? normalizeStatus(report.status)
    : chartCount > 0
      ? 'completed'
      : 'processing';

  return {
    id: report.id,
    name: report.name ?? report.original_name ?? report.file_name ?? `Report ${report.id}`,
    description: report.description,
    fileName: report.file_name,
    filePath: report.file_path,
    fileSize: report.file_size,
    mimeType: report.mime_type,
    status: derivedStatus,
    chartCount,
    charts: report.processed_data?.charts?.map(mapChart) ?? [],
    processedData: report.processed_data
      ? {
          summary: report.processed_data.summary ?? { total_rows: 0, columns: [] },
          rows: report.processed_data.rows ?? [],
          charts: report.processed_data.charts ?? [],
        }
      : undefined,
    createdAt: report.created_at,
    updatedAt: report.updated_at,
  };
};

export const reportService = {
  uploadFile: async (file: File): Promise<IUploadWithColumnsResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<IUploadApiResponse>(REPORTS_ENDPOINT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const reportId = response.data.data.report_id ?? response.data.data.id ?? response.data.data.reportId ?? '';
    return {
      reportId,
      columns: response.data.data.columns ?? [],
      message: response.data.message,
    };
  },

  getReports: async (): Promise<IReport[]> => {
    const response = await apiClient.get<IReportListResponse>(REPORTS_ENDPOINT, {
      params: {
        page: 1,
        limit: 10,
        sort_by: 'created_at',
        sort_dir: 'desc',
      },
    });
    return response.data.data.map(mapReport);
  },

  getReportById: async (id: string): Promise<IReport> => {
    const response = await apiClient.get<IReportDetailResponse>(`${REPORTS_ENDPOINT}/${id}`);
    return mapReport(response.data.data);
  },

  deleteReport: async (id: string): Promise<void> => {
    await apiClient.delete(`${REPORTS_ENDPOINT}/${id}`);
  },

  generateReport: async (id: string, config: IGenerateReportRequest): Promise<IReport> => {
    const response = await apiClient.post<IReportDetailResponse>(
      `${REPORTS_ENDPOINT}/${id}/generate`,
      config
    );
    return mapReport(response.data.data);
  },
};
