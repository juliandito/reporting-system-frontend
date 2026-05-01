import { Loader2 } from 'lucide-react';

interface ProcessingStepProps {
  fileName: string;
}

export function ProcessingStep({ fileName }: ProcessingStepProps) {
  return (
    <div className="max-w-md mx-auto mt-32 text-center">
      <Loader2
        size={48}
        className="animate-spin mx-auto mb-6"
        style={{ color: '#102A83' }}
      />
      <h2 className="text-2xl font-bold mb-2" style={{ color: '#333333' }}>
        Generating Report...
      </h2>
      <p style={{ color: '#6C757D' }}>
        Applying template rules and calculating datasets
        {fileName ? (
          <>
            {' '}based on <span className="font-semibold" style={{ color: '#333333' }}>{fileName}</span>
          </>
        ) : null}
      </p>
    </div>
  );
}
