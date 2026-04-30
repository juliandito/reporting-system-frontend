import { FileSpreadsheet } from 'lucide-react';
import type { SheetPreviewData } from '../hooks/useUploadPage';

interface UploadPreviewProps {
  file: File;
  previewData: SheetPreviewData | null;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadPreview({ file, previewData }: UploadPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-base-200 rounded-xl">
        <FileSpreadsheet size={32} className="text-success flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{file.name}</p>
          <p className="text-xs text-base-content/50">{formatFileSize(file.size)}</p>
        </div>
      </div>

      {previewData && (
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">
                Preview: <span className="text-primary">{previewData.sheetName}</span>
              </h3>
              <span className="text-xs text-base-content/50">
                First 5 rows
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    {previewData.headers.map((h, i) => (
                      <th key={i}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.rows.map((row, ri) => (
                    <tr key={ri}>
                      {previewData.headers.map((_, ci) => (
                        <td key={ci}>{row[ci] ?? ''}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
