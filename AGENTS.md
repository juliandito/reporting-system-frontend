# AGENTS.md — Reporting System Frontend

## Project Overview
A React TypeScript single-page application (SPA) for viewing and managing reporting data from an Excel upload pipeline. Built with Vite, React Router v6, Zustand, Tailwind CSS + DaisyUI, and Chart.js.

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| React | ^19.2.5 | UI framework |
| TypeScript | ~6.x | Type safety |
| Vite | ^8 | Build tool / dev server |
| React Router DOM | ^7 | Client-side routing |
| Zustand | ^5 | Global state management |
| Axios | ^1 | HTTP client |
| Tailwind CSS | ^3 | Utility-first CSS |
| DaisyUI | ^4 | Component library on top of Tailwind |
| lucide-react | latest | Icon library |
| chart.js + react-chartjs-2 | latest | Chart rendering |
| xlsx | latest | Excel file parsing (client-side preview) |

## Architecture

```
src/
  components/
    ui/                     # Shared primitive components
      Badge.tsx             # Status badge with color mapping
      LoadingSpinner.tsx    # DaisyUI spinner wrapper
      Modal.tsx             # Reusable modal dialog
      Table.tsx             # Generic typed data table
      index.ts              # Barrel export
  constants/
    RouteConstants.ts       # Centralized route path definitions
  layouts/
    DashboardLayout.tsx     # Sidebar + topbar layout shell
  pages/
    dashboard/
      DashboardPage.tsx     # Main dashboard overview
      hooks/
        useDashboardPage.ts # Data fetching + stat computation
      components/
        DashboardStats.tsx  # KPI stat cards
        RecentReports.tsx   # Latest reports list
    upload/
      UploadPage.tsx        # Excel upload page
      hooks/
        useUploadPage.ts    # File selection, XLSX preview, upload logic
      components/
        FileUploadZone.tsx  # Drag-and-drop / file input
        UploadPreview.tsx   # Table preview of first 5 rows
    reports/
      ReportsPage.tsx       # Reports list page
      ReportDetailPage.tsx  # Single report with charts
      hooks/
        useReportsPage.ts   # Reports data + delete flow
      components/
        ReportTable.tsx     # Reports table with actions
        DeleteReportModal.tsx
        ChartDisplay.tsx    # Renders chart.js charts by type
  router/
    index.tsx               # createBrowserRouter config
  services/
    report.service.ts       # Axios API calls to backend
  store/
    useReportStore.ts       # Zustand store for reports state
  types/
    index.ts                # Shared TypeScript interfaces & types
  App.tsx                   # RouterProvider root
  main.tsx                  # ReactDOM.createRoot entry
  index.css                 # Tailwind directives
```

## Naming Conventions

- **Interfaces**: `IReport`, `IChart`, `IUploadResponse`
- **Types**: `TReportStatus`, `TChartType`
- **Components**: PascalCase — `DashboardPage`, `ChartDisplay`
- **Hooks**: camelCase prefixed with `use` — `useDashboardPage`, `useUploadPage`
- **Services**: camelCase singleton object — `reportService`
- **Store**: `useReportStore` (Zustand hook)
- **Constants**: UPPER_SNAKE_CASE keys in object — `ROUTES.DASHBOARD`

## Color Palette (BPH Migas Brand)

| Token | Hex | Usage |
|---|---|---|
| Primary | `#102A83` | Sidebar, buttons, primary actions |
| Secondary | `#93C93E` | Highlights, success states |
| Accent | `#00A3E0` | Info elements |
| Warning | `#FFC72C` | Draft status, warnings |
| Error | `#DA2128` | Delete, error states |
| Background | `#F8F9FA` | Page background (`base-100`) |
| Card | `#FFFFFF` | Cards |
| Primary Text | `#333333` | Body text |
| Secondary Text | `#6C757D` | Muted text |
| Borders | `#E0E0E0` | Dividers, card borders |

## State Management (Zustand)

The `useReportStore` in `src/store/useReportStore.ts` manages:
- `reports: IReport[]` — list of all reports
- `selectedReport: IReport | null` — report being viewed
- `isLoading: boolean` — global loading state
- `error: string | null` — global error message

Actions: `fetchReports`, `fetchReportById`, `uploadReport`, `deleteReport`, `setSelectedReport`, `clearError`

## API Integration

Base URL configurable via `VITE_API_BASE_URL` environment variable (default: `http://localhost:8080/api`).

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/reports` | Fetch all reports |
| GET | `/reports/:id` | Fetch single report |
| POST | `/reports/upload` | Upload Excel file (multipart) |
| DELETE | `/reports/:id` | Delete a report |

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | Navigate | Redirects to `/dashboard` |
| `/dashboard` | DashboardPage | Overview with stats |
| `/dashboard/upload` | UploadPage | Excel file upload |
| `/dashboard/reports` | ReportsPage | Reports table |
| `/dashboard/reports/:id` | ReportDetailPage | Charts display |

## Environment Variables

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## Development

```bash
yarn dev      # Start dev server (http://localhost:5173)
yarn build    # Production build
yarn lint     # ESLint check
yarn preview  # Preview production build
```
