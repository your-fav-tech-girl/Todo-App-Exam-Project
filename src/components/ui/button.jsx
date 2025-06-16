import React from "react";

export function Button({ children, className = "", variant = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600 px-2 py-2" ,
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 px-2 py-2",
    ghost: "text-gray-700 bg-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </button>
  );
}
