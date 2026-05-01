import { BarChart3, LineChart, PieChart, Plus, Trash2, CheckCircle2, Settings, ArrowLeft } from 'lucide-react';
import { LoadingSpinner } from '../../../components/ui';
import type { IWizardChartConfig } from '../../../types';

interface ChartBuilderStepProps {
  columns: string[];
  charts: IWizardChartConfig[];
  activeChartIndex: number | null;
  templateName: string;
  isLoading: boolean;
  onTemplateNameChange: (name: string) => void;
  onAddChart: () => void;
  onUpdateChart: (index: number, partial: Partial<IWizardChartConfig>) => void;
  onRemoveChart: (index: number) => void;
  onSetActiveChart: (index: number) => void;
  onGenerate: () => void;
  onBack: () => void;
}

const CHART_TYPE_ICONS = {
  bar: BarChart3,
  line: LineChart,
  pie: PieChart,
} as const;

const AGGREGATION_OPTIONS: { value: IWizardChartConfig['aggregation']; label: string }[] = [
  { value: 'sum', label: 'Sum' },
  { value: 'avg', label: 'Average' },
  { value: 'count', label: 'Count' },
  { value: 'max', label: 'Max' },
  { value: 'min', label: 'Min' },
];

export function ChartBuilderStep({
  columns,
  charts,
  activeChartIndex,
  templateName,
  isLoading,
  onTemplateNameChange,
  onAddChart,
  onUpdateChart,
  onRemoveChart,
  onSetActiveChart,
  onGenerate,
  onBack,
}: ChartBuilderStepProps) {
  const activeChart = activeChartIndex !== null ? charts[activeChartIndex] : null;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#102A83' }}>
            Report Template Builder
          </h2>
          <p className="mt-1" style={{ color: '#6C757D' }}>
            Configure how your data should be visualized. This will be saved as a template.
          </p>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading || charts.length === 0}
          className="flex items-center gap-2 px-6 py-2.5 font-bold rounded-lg transition-colors shadow-sm disabled:opacity-60"
          style={{ background: '#93C93E', color: '#102A83' }}
        >
          {isLoading ? <LoadingSpinner size="sm" /> : <CheckCircle2 size={18} />}
          {isLoading ? 'Generating...' : 'Save Template & Generate'}
        </button>
      </div>

      {/* Template name */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-1" style={{ color: '#333333' }}>
          Report Name
        </label>
        <input
          type="text"
          value={templateName}
          onChange={(e) => onTemplateNameChange(e.target.value)}
          placeholder="e.g. Salary Report Q1"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
          style={{ borderColor: '#E0E0E0', color: '#333333' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Chart list */}
        <div
          className="lg:col-span-1 border rounded-xl shadow-sm overflow-hidden flex flex-col bg-white"
          style={{ borderColor: '#E0E0E0', height: '500px' }}
        >
          <div
            className="p-4 border-b flex justify-between items-center"
            style={{ background: '#F8F9FA', borderColor: '#E0E0E0' }}
          >
            <h3 className="font-bold" style={{ color: '#333333' }}>Defined Charts</h3>
            <button
              onClick={onAddChart}
              className="p-1 transition-colors"
              style={{ color: '#00A3E0' }}
              title="Add chart"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="overflow-y-auto p-2 space-y-2 flex-1">
            {charts.length === 0 ? (
              <div className="text-center p-8" style={{ color: '#6C757D' }}>
                <p className="text-sm">No charts added yet.</p>
                <button
                  onClick={onAddChart}
                  className="mt-2 text-sm font-semibold hover:underline"
                  style={{ color: '#00A3E0' }}
                >
                  Add First Chart
                </button>
              </div>
            ) : (
              charts.map((chart, i) => {
                const Icon = CHART_TYPE_ICONS[chart.type as keyof typeof CHART_TYPE_ICONS] ?? BarChart3;
                const isActive = activeChartIndex === i;
                return (
                  <div
                    key={i}
                    onClick={() => onSetActiveChart(i)}
                    className="p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-3"
                    style={
                      isActive
                        ? { borderColor: '#102A83', background: 'rgba(16,42,131,0.05)', outline: '1px solid #102A83' }
                        : { borderColor: '#E0E0E0' }
                    }
                  >
                    <div
                      className="p-2 rounded border bg-white"
                      style={
                        isActive
                          ? { borderColor: '#102A83', color: '#102A83' }
                          : { borderColor: '#E0E0E0', color: '#6C757D' }
                      }
                    >
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-sm truncate" style={{ color: '#333333' }}>
                        {chart.title || 'Untitled Chart'}
                      </p>
                      <p className="text-xs truncate" style={{ color: '#6C757D' }}>
                        Y: {chart.y_axis || '—'} | X: {chart.x_axis || '—'}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Chart config form */}
        <div
          className="lg:col-span-2 border rounded-xl shadow-sm bg-white overflow-y-auto"
          style={{ borderColor: '#E0E0E0', height: '500px', padding: '1.5rem' }}
        >
          {activeChart !== null && activeChartIndex !== null ? (
            <div className="space-y-5">
              <div
                className="flex justify-between items-center border-b pb-4"
                style={{ borderColor: '#E0E0E0' }}
              >
                <h3 className="font-bold text-lg" style={{ color: '#102A83' }}>
                  Edit Chart Configuration
                </h3>
                <button
                  onClick={() => onRemoveChart(activeChartIndex)}
                  className="flex items-center gap-1 text-sm font-medium hover:underline"
                  style={{ color: '#DA2128' }}
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Chart title */}
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1" style={{ color: '#333333' }}>
                    Chart Title
                  </label>
                  <input
                    type="text"
                    value={activeChart.title}
                    onChange={(e) => onUpdateChart(activeChartIndex, { title: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#E0E0E0' }}
                    placeholder="e.g. Net Salary by Employee"
                  />
                </div>

                {/* Chart type */}
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: '#333333' }}>
                    Chart Type
                  </label>
                  <select
                    value={activeChart.type}
                    onChange={(e) =>
                      onUpdateChart(activeChartIndex, {
                        type: e.target.value as IWizardChartConfig['type'],
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#E0E0E0' }}
                  >
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                    <option value="pie">Pie</option>
                  </select>
                </div>

                {/* Aggregation */}
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: '#333333' }}>
                    Aggregation
                  </label>
                  <select
                    value={activeChart.aggregation}
                    onChange={(e) =>
                      onUpdateChart(activeChartIndex, {
                        aggregation: e.target.value as IWizardChartConfig['aggregation'],
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#E0E0E0' }}
                  >
                    {AGGREGATION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* X Axis */}
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: '#333333' }}>
                    X-Axis (Group By)
                  </label>
                  <select
                    value={activeChart.x_axis}
                    onChange={(e) => onUpdateChart(activeChartIndex, { x_axis: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#E0E0E0' }}
                  >
                    <option value="">Select column…</option>
                    {columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Y Axis */}
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: '#333333' }}>
                    Y-Axis (Value)
                  </label>
                  <select
                    value={activeChart.y_axis}
                    onChange={(e) => onUpdateChart(activeChartIndex, { y_axis: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#E0E0E0' }}
                  >
                    <option value="">Select column…</option>
                    {columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live logic preview */}
              <div
                className="mt-4 rounded-lg p-4 border flex flex-col items-center justify-center min-h-[100px]"
                style={{ background: '#F8F9FA', borderColor: '#E0E0E0' }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: '#6C757D' }}
                >
                  Live Logic Preview
                </p>
                <p className="text-sm text-center" style={{ color: '#333333' }}>
                  {activeChart.x_axis && activeChart.y_axis ? (
                    <>
                      Show{' '}
                      <span className="font-semibold" style={{ color: '#102A83' }}>
                        {activeChart.aggregation}
                      </span>{' '}
                      of{' '}
                      <span className="font-semibold" style={{ color: '#102A83' }}>
                        {activeChart.y_axis}
                      </span>{' '}
                      grouped by{' '}
                      <span className="font-semibold" style={{ color: '#102A83' }}>
                        {activeChart.x_axis}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: '#6C757D' }}>Select X and Y axis to see preview</span>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="h-full flex flex-col items-center justify-center"
              style={{ color: '#6C757D' }}
            >
              <Settings size={48} className="opacity-20 mb-4" />
              <p>Select a chart from the left or create a new one to configure.</p>
            </div>
          )}
        </div>
      </div>

      {/* Back button */}
      <div className="mt-4">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-1 text-sm font-medium hover:underline disabled:opacity-60"
          style={{ color: '#6C757D' }}
        >
          <ArrowLeft size={16} /> Back to Preview
        </button>
      </div>
    </div>
  );
}
