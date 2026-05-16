# Reporting System Frontend

The main purpose of this app is to let users upload Excel files, inspect a preview of the data, choose how charts should be configured, and generate a visual report from that dataset.

Core flow:

1. Login to access the dashboard.
2. Upload an Excel file.
3. Preview sheet data and detected columns.
4. Configure one or more charts.
5. Generate a report and view the final chart output.

## Main Features & Highlight

- Excel file upload with client-side preview.
- Configurable chart builder for report generation.
- Report list and report detail pages.
- Dashboard overview for recent reporting activity.
- Auth-protected routes for internal/admin usage.
- Centralized state management with Zustand.

This project highlights:

- Building a structured SPA with protected and public routes.
- Designing a multi-step data processing workflow.
- Integrating frontend state with backend APIs.
- Rendering configurable charts from uploaded tabular data.
- Organizing a React codebase into reusable components, hooks, services, and stores.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Axios
- Chart.js with react-chartjs-2
- Tailwind CSS and DaisyUI
- read-excel-file

## Project Structure

```text
src/
  components/
    ui/                  Reusable UI building blocks
  constants/             App-wide constants and route definitions
  layouts/               Auth and dashboard layout shells
  pages/
    auth/                Login page and auth hook
    dashboard/           Dashboard overview and stats
    reports/             Report list and report detail pages
    upload/              Excel upload, preview, processing, chart builder
  router/                Route config and auth guards
  services/              API service layer
  store/                 Zustand stores for auth and reports
  types/                 Shared TypeScript types
```

## How It Works

The upload flow is implemented as a step-based experience:

- Step 1: Select an Excel file.
- Step 2: Parse and preview the sheet data.
- Step 3: Upload the file, retrieve available columns, and configure charts.
- Step 4: Generate the final report and open the detail page.

This makes the app suitable for business reporting scenarios where raw spreadsheet data needs to be converted into visual summaries without manual chart creation in Excel.

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm or yarn

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Environment

Create a `.env` file if needed:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Example Use Case

A user uploads a monthly Excel report, selects which columns should be used for the x-axis and y-axis, chooses chart types such as bar or line, and generates a report page that visualizes the uploaded dataset.

## Status

This project is a frontend implementation focused on report visualization and configurable chart generation from Excel-based data sources.
