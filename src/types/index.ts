export interface IProcessedReport {
  summary: {
    total_rows: number;
    columns: string[];
  };
  rows: Record<string, string>[];
  charts: IApiChart[];
}

export interface IReport {
  id: string;
  name: string;
  description?: string;
  fileName?: string;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  createdAt: string;
  updatedAt: string;
  charts: IChart[];
  chartCount: number;
  status: TReportStatus;
  processedData?: IProcessedReport;
}

export interface IChart {
  id: string;
  title: string;
  type: TChartType;
  labels: string[];
  datasets: IChartDataset[];
}

export interface IChartDataset {
  name: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string;
}

export interface IUploadResponse {
  reportId: string;
  message: string;
}

export interface IUploadWithColumnsResponse {
  reportId: string;
  columns: string[];
  message: string;
}

export interface IWizardChartConfig {
  title: string;
  type: TChartType;
  x_axis: string;
  y_axis: string;
  aggregation: 'sum' | 'avg' | 'count' | 'max' | 'min';
}

export interface IGenerateReportRequest {
  name?: string;
  description?: string;
  charts: IWizardChartConfig[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginData {
  token: string;
  user: IUser;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IReportListResponse {
  success: boolean;
  message: string;
  data: IReportApiItem[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface IReportDetailResponse {
  success: boolean;
  message: string;
  data: IReportApiItem;
}

export interface IUploadApiResponse {
  success: boolean;
  message: string;
  data: {
    report_id?: string;
    id?: string;
    reportId?: string;
    columns?: string[];
    status?: string;
  };
}

export interface IChartSpec {
  id: string;
  type: string;
  title: string;
  label_field?: string;
  group_by: string;
  aggregate: string;
  series: { name: string; field: string }[];
}

export interface IReportApiItem {
  id: string;
  user_id?: string;
  template_id?: string;
  name?: string;
  description?: string;
  file_name?: string;
  original_name?: string;
  file_path?: string;
  file_size?: number;
  mime_type?: string;
  status?: string;
  chart_definition?: IChartSpec[];
  processed_data?: {
    summary?: {
      total_rows: number;
      columns: string[];
    };
    rows?: Record<string, string>[];
    charts?: IApiChart[];
  };
  created_at: string;
  updated_at: string;
}

export interface IApiChart {
  id: string;
  type: TChartType;
  title: string;
  labels: string[];
  datasets: Array<{
    name: string;
    data: number[];
  }>;
}

export type TReportStatus = 'draft' | 'published' | 'archived' | 'completed' | 'processing' | 'failed';
export type TChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';
