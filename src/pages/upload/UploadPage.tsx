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
    description,
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
    setDescription,
  } = useUploadPage();

  return (
    <div className="flex gap-8">
      {/* Step indicator - left side */}
      <div className="flex-shrink-0 pt-1">
        <ul className="steps steps-vertical">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={`step text-sm ${i + 1 <= step ? 'step-primary' : ''}`}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content - right side */}
      <div className="flex-1 min-w-0 space-y-6">
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Upload Excel Data</h1>
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
            description={description}
            isLoading={isLoading}
            onTemplateNameChange={setTemplateName}
            onDescriptionChange={setDescription}
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
    </div>
  );
}
