import { useRef, useState, useCallback } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
}

const ACCEPTED_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

export function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type) && !file.name.match(/\.(xlsx|xls)$/i)) {
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) handleFile(selectedFile);
    },
    [handleFile]
  );

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-base-300 hover:border-primary hover:bg-base-200/50'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={onInputChange}
      />
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-primary/10 rounded-full">
          {isDragging ? (
            <Upload size={40} className="text-primary" />
          ) : (
            <FileSpreadsheet size={40} className="text-primary" />
          )}
        </div>
        <div>
          <p className="text-lg font-semibold">
            {isDragging ? 'Drop your file here' : 'Drag & drop your Excel file'}
          </p>
          <p className="text-sm text-base-content/50 mt-1">
            or <span className="text-primary font-medium">browse files</span>
          </p>
        </div>
        <div className="text-xs text-base-content/40">
          Supported formats: .xlsx, .xls
        </div>
      </div>
    </div>
  );
}
