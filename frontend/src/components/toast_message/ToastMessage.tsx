import React, { useEffect, useState } from "react";
import "./ToastMessage.css";

interface ToastMessageProps {
    id: number;
    message: string;
    variant: "success" | "error" | "info" | "warning";
    duration?: number;
    onClose: (id: number) => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
    id,
    message,
    variant,
    duration = 5000,
    onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  function getHeaderByVariant(variant: string) {
    switch (variant) {
        case "success":
            return "Success";
        case "error":
            return "Error";
        case "info":
            return "Info";
        case "warning":
            return "Warning";
        default:
            return "Notification";
    }
  }

  function getIconByVariant(variant: string) {
    switch (variant) {
        case "success":
            return "✔️";
        case "error":
            return "🚫";
        case "info":
            return "ℹ️";
        case "warning":
            return "⚠️";
        default:
            return "🔔";
    }
  }

  return (
    <div className={`toast-message-body ${visible ? "show" : "hide"}`}>
        <div className="toast-header">
            <span className="toast-icon">{getIconByVariant(variant)}</span>
            <strong className="toast-title">{getHeaderByVariant(variant)}</strong>
            <button className="close-button" onClick={() => { setVisible(false); setTimeout(() => onClose(id), 300); }}>❌</button>
        </div>
        <p>{message}</p>
    </div>
  );
};

export default ToastMessage;
