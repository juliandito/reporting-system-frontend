import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import type { IChart } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface ChartDisplayProps {
  chart: IChart;
}

// Soft pastel border colors
const SOFT_BORDER_COLORS = [
  '#5B8DEF',
  '#60C17D',
  '#FFA94D',
  '#FF6B6B',
  '#9775FA',
  '#38D9A9',
  '#F06595',
  '#74C0FC',
];

// Semi-transparent fill versions (40% opacity)
const SOFT_FILL_COLORS = SOFT_BORDER_COLORS.map((c) => c + '66');

const BASE_OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        borderRadius: 4,
        useBorderRadius: true,
        padding: 16,
        font: { size: 12 },
        color: '#6C757D',
      },
    },
    title: { display: false },
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.95)',
      titleColor: '#333333',
      bodyColor: '#6C757D',
      borderColor: '#E0E0E0',
      borderWidth: 1,
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { color: '#6C757D', font: { size: 11 } },
      border: { color: '#E0E0E0' },
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { color: '#6C757D', font: { size: 11 } },
      border: { color: '#E0E0E0' },
    },
  },
};

const CIRCULAR_OPTIONS = {
  responsive: true,
  plugins: BASE_OPTIONS.plugins,
};

const RADAR_OPTIONS = {
  responsive: true,
  plugins: BASE_OPTIONS.plugins,
  scales: {
    r: {
      grid: { color: 'rgba(0,0,0,0.06)' },
      ticks: { color: '#6C757D', backdropColor: 'transparent', font: { size: 10 } },
      pointLabels: { color: '#6C757D', font: { size: 11 } },
    },
  },
};

export function ChartDisplay({ chart }: ChartDisplayProps) {
  const isCircularChart = chart.type === 'pie' || chart.type === 'doughnut';
  const isLine = chart.type === 'line';

  const chartData = {
    labels: chart.labels,
    datasets: chart.datasets.map((dataset, index) => {
      const border = SOFT_BORDER_COLORS[index % SOFT_BORDER_COLORS.length];
      const fill = SOFT_FILL_COLORS[index % SOFT_FILL_COLORS.length];
      return {
        label: dataset.name,
        data: dataset.data,
        backgroundColor: dataset.backgroundColor ?? (isCircularChart ? SOFT_FILL_COLORS : isLine ? fill : fill),
        borderColor: dataset.borderColor ?? (isCircularChart ? SOFT_BORDER_COLORS : border),
        borderWidth: isCircularChart ? 2 : 2,
        borderRadius: chart.type === 'bar' ? 6 : 0,
        pointBackgroundColor: border,
        pointRadius: isLine ? 4 : 0,
        pointHoverRadius: isLine ? 6 : 0,
        tension: isLine ? 0.4 : 0,
        fill: false,
      };
    }),
  };

  const renderChart = () => {
    switch (chart.type) {
      case 'bar':
        return <Bar data={chartData} options={BASE_OPTIONS} />;
      case 'line':
        return <Line data={chartData} options={BASE_OPTIONS} />;
      case 'pie':
        return <Pie data={chartData} options={CIRCULAR_OPTIONS} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={CIRCULAR_OPTIONS} />;
      case 'radar':
        return <Radar data={chartData} options={RADAR_OPTIONS} />;
      default:
        return <Bar data={chartData} options={BASE_OPTIONS} />;
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body">
        <h3 className="card-title text-base">{chart.title}</h3>
        <div className="mt-2">{renderChart()}</div>
      </div>
    </div>
  );
}
