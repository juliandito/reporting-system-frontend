import { FileSpreadsheet } from 'lucide-react';
import { LoadingSpinner } from '../../../components/ui';
import type { SheetPreviewData } from '../hooks/useUploadPage';

interface UploadPreviewProps {
  file: File;
  previewData: SheetPreviewData | null;
  isLoading: boolean;
  onNext: () => void;
  onCancel: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadPreview({ file, previewData, isLoading, onNext, onCancel }: UploadPreviewProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#102A83' }}>Data Preview</h2>
        <p className="mt-1" style={{ color: '#6C757D' }}>
          Verify your data columns before building the report template.
        </p>
      </div>

      {/* File info bar */}
      <div
        className="flex items-center gap-4 p-4 rounded-lg border mb-6"
        style={{ background: '#F8F9FA', borderColor: '#E0E0E0' }}
      >
        <div className="p-2 rounded border bg-white" style={{ borderColor: '#E0E0E0', color: '#93C93E' }}>
          <FileSpreadsheet size={24} />
        </div>
        <div>
          <p className="font-bold" style={{ color: '#333333' }}>{file.name}</p>
          <p className="text-xs" style={{ color: '#6C757D' }}>{formatFileSize(file.size)}</p>
        </div>
      </div>

      {/* Preview table */}
      {previewData && (
        <div
          className="rounded-lg border overflow-hidden mb-6 shadow-sm"
          style={{ borderColor: '#E0E0E0' }}
        >
          <div
            className="px-4 py-3 border-b flex justify-between items-center"
            style={{ background: '#F8F9FA', borderColor: '#E0E0E0' }}
          >
            <h4 className="font-bold text-sm" style={{ color: '#102A83' }}>
              Preview: {previewData.sheetName}
            </h4>
            <span className="text-xs" style={{ color: '#6C757D' }}>First 5 rows</span>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead style={{ color: '#6C757D' }}>
                <tr>
                  {previewData.headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 font-medium border-b"
                      style={{ borderColor: '#E0E0E0' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.rows.map((row, ri) => (
                  <tr key={ri} style={{ cursor: 'default' }}
                    className="hover:bg-gray-50"
                  >
                    {previewData.headers.map((_, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-2 border-b font-mono"
                        style={{ borderColor: '#E0E0E0', color: '#333333' }}
                      >
                        {row[ci] ?? ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onNext}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2.5 text-white font-bold rounded-lg transition-colors shadow-sm disabled:opacity-60"
          style={{ background: '#102A83' }}
        >
          {isLoading && <LoadingSpinner size="sm" />}
          {isLoading ? 'Uploading...' : 'Next: Build Template & Charts'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-2.5 font-bold rounded-lg border transition-colors disabled:opacity-60"
          style={{ background: '#FFFFFF', color: '#333333', borderColor: '#E0E0E0' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
