import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { UploadPage } from '../pages/upload/UploadPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { ReportDetailPage } from '../pages/reports/ReportDetailPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { ROUTES } from '../constants/RouteConstants';
import { RequireAuth } from './RequireAuth';
import { PublicOnlyRoute } from './PublicOnlyRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicOnlyRoute>
        <AuthLayout />
      </PublicOnlyRoute>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'upload',
        element: <UploadPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'reports/:id',
        element: <ReportDetailPage />,
      },
    ],
  },
]);
