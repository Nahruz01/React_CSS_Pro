// src/_component/ConfirmModal.jsx

import "../_styles/Comp_ConfirmModal.css"

export default function ConfirmModal({ open, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        {/* Title */}
        <h3 className="confirm-title">{title}</h3>

        {/* Message */}
        <p className="confirm-message">{message}</p>

        {/* Action Buttons */}
        <div className="Post_Buttons confirm-actions">
          <button onClick={onCancel} className="confirm-btn cancel">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="confirm-btn danger">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
