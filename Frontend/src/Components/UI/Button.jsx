import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-body font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed rounded-md px-6 py-2.5 text-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0";
  
  // Using arbitrary hex values so they always render correctly without relying on tailwind.config.js
  const variants = {
    primary: "bg-[#F2803D] text-white hover:bg-[#E4611A] active:bg-[#BE4B11] focus:ring-[#F2803D] shadow-md hover:shadow-lg",
    flame: "bg-[#F2803D] text-white hover:shadow-lg active:opacity-90 focus:ring-[#F2803D] shadow-md",
    secondary: "bg-[#3AA33A] text-white hover:bg-[#2A832A] active:bg-[#236723] focus:ring-[#3AA33A] shadow-md hover:shadow-lg",
    outline: "bg-transparent text-gray-800 border border-gray-300 hover:border-[#3AA33A] hover:text-[#2A832A] focus:ring-[#3AA33A]",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:ring-gray-300"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
