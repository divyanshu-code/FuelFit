import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 1.5, className = '' }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const springValue = useSpring(0, {
    bounce: 0,
    duration: duration * 1000,
  });

  useEffect(() => {
    springValue.set(value);
    const timer = setTimeout(() => setHasAnimated(true), duration * 1000);
    return () => clearTimeout(timer);
  }, [value, springValue, duration]);

  const displayValue = useTransform(springValue, (current) =>
    Math.round(current).toString()
  );

  return (
    <motion.span className={className}>
      {hasAnimated ? Math.round(value) : displayValue}
    </motion.span>
  );
};

export default AnimatedCounter;
