import { FiAlertTriangle } from "react-icons/fi";
import Button from "./Button";

const ConfirmModal = ({
  show,
  title = "Confirm action",
  message = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-backdrop show" onClick={onCancel} />
      <div className="modal-dialog modal-dialog-centered px-3">
        <div className="modal-content app-card border-0">
          <div className="modal-body p-4">
            <FiAlertTriangle className={danger ? "text-danger" : "text-warning"} size={32} />
            <h2 className="h5 fw-bold mt-3">{title}</h2>
            <p className="text-muted-app">{message}</p>
            <div className="d-flex gap-2 justify-content-end">
              <Button variant="ghost" onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button variant={danger ? "secondary" : "primary"} loading={loading} onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;