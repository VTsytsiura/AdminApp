import React, { useState, useCallback } from "react";
import ToastMessage from "./ToastMessage";

let idCounter = 0;

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<{ id: number; message: string; variant: "success" | "error" | "info" | "warning" }[]>([]);

  const addToast = useCallback((message: string, variant: "success" | "error" | "info" | "warning") => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  (window as any).toast = addToast;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastMessage key={t.id} id={t.id} message={t.message} variant={t.variant} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;