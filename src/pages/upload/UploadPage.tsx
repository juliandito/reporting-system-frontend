import { useUploadPage } from './hooks/useUploadPage';
import { FileUploadZone } from './components/FileUploadZone';
import { UploadPreview } from './components/UploadPreview';
import { LoadingSpinner } from '../../components/ui';

export function UploadPage() {
  const {
    file,
    previewData,
    isLoading,
    error,
    handleFileSelect,
    handleUpload,
    handleReset,
  } = useUploadPage();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-neutral">Upload Excel Data</h1>
        <p className="text-base-content/60 mt-1">
          Upload an Excel file (.xlsx, .xls) to generate charts and reports
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {!file ? (
        <FileUploadZone onFileSelect={handleFileSelect} />
      ) : (
        <div className="space-y-4">
          <UploadPreview file={file} previewData={previewData} />
          <div className="flex gap-3">
            <button
              className="btn btn-primary gap-2"
              onClick={handleUpload}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" /> : null}
              {isLoading ? 'Uploading...' : 'Upload & Generate Charts'}
            </button>
            <button className="btn btn-ghost" onClick={handleReset} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
