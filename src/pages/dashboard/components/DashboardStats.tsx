import { FileText, CheckCircle, Clock, BarChart3 } from 'lucide-react';
import type { DashboardStats } from '../hooks/useDashboardPage';

interface DashboardStatsProps {
  stats: DashboardStats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const cards = [
    {
      title: 'Total Reports',
      value: stats.totalReports,
      icon: <FileText size={24} />,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Published',
      value: stats.publishedReports,
      icon: <CheckCircle size={24} />,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      title: 'Drafts',
      value: stats.draftReports,
      icon: <Clock size={24} />,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      title: 'Total Charts',
      value: stats.totalCharts,
      icon: <BarChart3 size={24} />,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.title} className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-base-content/60 font-medium uppercase tracking-wide">
                  {card.title}
                </p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                {card.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
