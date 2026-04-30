import { Modal, LoadingSpinner } from '../../../components/ui';

interface DeleteReportModalProps {
  isOpen: boolean;
  reportName: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteReportModal({
  isOpen,
  reportName,
  isLoading,
  onConfirm,
  onCancel,
}: DeleteReportModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Delete Report">
      <p className="text-base-content/70">
        Are you sure you want to delete <strong>{reportName}</strong>? This action cannot be undone.
      </p>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
        <button className="btn btn-error gap-2" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" /> : null}
          Delete
        </button>
      </div>
    </Modal>
  );
}
