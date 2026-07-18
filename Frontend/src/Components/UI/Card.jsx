import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-medium transition-all duration-300 ${hover ? 'hover:-translate-y-1 hover:shadow-strong hover:bg-white/90' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
