import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`glass-panel backdrop-blur-xl rounded-2xl p-6 shadow-medium transition-all duration-300 ${hover ? 'hover:-translate-y-1 hover:shadow-strong' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
