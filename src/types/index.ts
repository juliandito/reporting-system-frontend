export interface IReport {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  charts: IChart[];
  status: TReportStatus;
}

export interface IChart {
  id: string;
  reportId: string;
  title: string;
  type: TChartType;
  datasetLabel: string;
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  borderColor?: string;
  createdAt: string;
}

export interface IUploadResponse {
  reportId: string;
  message: string;
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

export type TReportStatus = 'draft' | 'published' | 'archived';
export type TChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';
