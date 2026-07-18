import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const ProgressRing = ({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 10,
  label = "Calories",
  unit = "kcal"
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percent = Math.min(value / max, 1);
  const offset = circumference - percent * circumference;

  // Functional color system based on progress
  const getColor = () => {
    if (percent < 0.8) return "stroke-brandGreen-500";
    if (percent <= 1) return "stroke-brandOrange-500";
    return "stroke-status-danger";
  };

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size} style={{ overflow: 'visible' }}>
        <defs>
          <filter id="glow-ring" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Track */}
        <circle
          className="stroke-surface-border opacity-30"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress */}
        <motion.circle
          className={`${getColor()} transition-colors duration-500`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference} // Start at 0
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          filter="url(#glow-ring)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      {/* Centered Text */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-text-primary font-display font-bold text-2xl leading-none">
          <AnimatedCounter value={value} />
        </span>
        <span className="text-text-secondary text-xs mt-1 font-medium">{unit}</span>
      </div>
    </div>
  );
};

export default ProgressRing;
