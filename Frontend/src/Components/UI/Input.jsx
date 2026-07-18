import React from 'react';

const Input = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full bg-surface-card border border-surface-border text-text-primary rounded-md px-4 py-2.5 font-body text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brandGreen-500 focus:border-brandGreen-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export default Input;
