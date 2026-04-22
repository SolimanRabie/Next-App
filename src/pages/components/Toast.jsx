import React, { useState, useEffect } from "react";

const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass =
    {
      success: "bg-success",
      error: "bg-danger",
      warning: "bg-warning",
      info: "bg-info",
    }[type] || "bg-info";

  const iconMap = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div
      className={`toast show ${bgClass} text-white position-fixed`}
      style={{ bottom: "20px", right: "20px", zIndex: 9999, minWidth: "300px" }}
    >
      <div className="toast-body d-flex align-items-center gap-2">
        <span>{iconMap[type]}</span>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Toast;
