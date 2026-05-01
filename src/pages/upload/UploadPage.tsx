import { useUploadPage } from './hooks/useUploadPage';
import { FileUploadZone } from './components/FileUploadZone';
import { UploadPreview } from './components/UploadPreview';
import { ChartBuilderStep } from './components/ChartBuilderStep';
import { ProcessingStep } from './components/ProcessingStep';

const STEPS = ['Upload', 'Preview', 'Configure', 'Processing'];

export function UploadPage() {
  const {
    step,
    file,
    previewData,
    columns,
    templateName,
    charts,
    activeChartIndex,
    isLoading,
    error,
    handleFileSelect,
    handleNextToChartBuilder,
    handleAddChart,
    handleUpdateChart,
    handleRemoveChart,
    handleSetActiveChart,
    handleGenerate,
    handleReset,
    handleBackToPreview,
    setTemplateName,
  } = useUploadPage();

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Step indicator */}
      <ul className="steps w-full">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`step text-xs ${i + 1 <= step ? 'step-primary' : ''}`}
          >
            {label}
          </li>
        ))}
      </ul>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {step === 1 && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold" style={{ color: '#102A83' }}>Upload Excel Data</h1>
            <p className="mt-1" style={{ color: '#6C757D' }}>
              Upload an Excel file (.xlsx, .xls) to generate charts and reports
            </p>
          </div>
          <FileUploadZone onFileSelect={handleFileSelect} />
        </div>
      )}

      {step === 2 && file && (
        <UploadPreview
          file={file}
          previewData={previewData}
          isLoading={isLoading}
          onNext={handleNextToChartBuilder}
          onCancel={handleReset}
        />
      )}

      {step === 3 && (
        <ChartBuilderStep
          columns={columns}
          charts={charts}
          activeChartIndex={activeChartIndex}
          templateName={templateName}
          isLoading={isLoading}
          onTemplateNameChange={setTemplateName}
          onAddChart={handleAddChart}
          onUpdateChart={handleUpdateChart}
          onRemoveChart={handleRemoveChart}
          onSetActiveChart={handleSetActiveChart}
          onGenerate={handleGenerate}
          onBack={handleBackToPreview}
        />
      )}

      {step === 4 && (
        <ProcessingStep fileName={file?.name ?? ''} />
      )}
    </div>
  );
}
