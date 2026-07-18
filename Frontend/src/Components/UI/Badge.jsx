import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: "bg-surface-alt text-text-secondary border border-surface-border",
    success: "bg-brandGreen-50 text-brandGreen-700 border border-brandGreen-200",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200", // Fallback yellow for warning
    danger: "bg-red-50 text-red-700 border border-red-200", // Fallback red for danger
    brand: "bg-brandOrange-50 text-brandOrange-700 border border-brandOrange-200"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
