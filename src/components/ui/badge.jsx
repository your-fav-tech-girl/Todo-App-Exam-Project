// src/components/ui/badge.jsx
import React from "react";

export function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
