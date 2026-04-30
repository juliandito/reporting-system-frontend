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

const DEFAULT_COLORS = [
  '#102A83',
  '#93C93E',
  '#00A3E0',
  '#FFC72C',
  '#DA2128',
  '#6C757D',
];

export function ChartDisplay({ chart }: ChartDisplayProps) {
  const isCircularChart = chart.type === 'pie' || chart.type === 'doughnut';

  const chartData = {
    labels: chart.labels,
    datasets: chart.datasets.map((dataset, index) => ({
      label: dataset.name,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor ?? (isCircularChart ? DEFAULT_COLORS : DEFAULT_COLORS[index % DEFAULT_COLORS.length]),
      borderColor: dataset.borderColor ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      borderWidth: 2,
      fill: false,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
    },
  };

  const renderChart = () => {
    switch (chart.type) {
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'pie':
        return <Pie data={chartData} options={options} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={options} />;
      case 'radar':
        return <Radar data={chartData} options={options} />;
      default:
        return <Bar data={chartData} options={options} />;
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
