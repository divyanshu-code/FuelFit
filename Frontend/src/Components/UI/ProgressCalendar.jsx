import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProgressCalendar = ({ selectedDate, onDateChange, progressHistory = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  const [direction, setDirection] = useState(0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // -- Date Logic --
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const prevMonth = () => {
    setDirection(-1);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDirection(1);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Build Grid Array
  const grid = [];
  for (let i = 0; i < firstDay; i++) {
    grid.push(null); // Empty slots before the 1st
  }
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  // Build Mobile Week View (last 7 days + today)
  const mobileWeek = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i); // From 6 days ago up to today
    return d;
  });

  // -- Status Check --
  const getDayStatus = (dateObj) => {
    if (!dateObj) return null;
    // Local format YYYY-MM-DD
    const pad = (n) => n.toString().padStart(2, '0');
    const dayStr = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}`;
    
    const progress = progressHistory.find((d) => d.date === dayStr);
    
    dateObj.setHours(0, 0, 0, 0);
    const isFuture = dateObj > today;

    if (isFuture) return 'neutral'; // No data yet

    if (progress) {
      return progress.completed ? 'completed' : 'partial';
    }
    return 'missed'; // Past date with no progress logged
  };

  // -- Styling --
  const getStatusStyles = (status, isSelected, isToday) => {
    let base = "flex flex-col items-center justify-center rounded-xl transition-all font-medium text-sm border-2 cursor-pointer ";
    
    if (isSelected) {
      base += "bg-brandGreen-500 text-white border-brandGreen-500 shadow-md ";
    } else {
      if (status === 'completed') base += "bg-brandGreen-100 text-brandGreen-800 border-transparent hover:border-brandGreen-300 ";
      else if (status === 'partial') base += "bg-brandOrange-50 text-brandOrange-600 border-transparent hover:border-brandOrange-200 ";
      else if (status === 'missed') base += "bg-surface-alt text-text-secondary border-transparent hover:border-surface-border ";
      else base += "bg-transparent text-text-secondary border-transparent "; // neutral/future
    }

    if (isToday && !isSelected) {
      base += "!border-brandGreen-500 font-bold "; // Distinct outline for today
    }

    return base;
  };

  // -- Animation Variants --
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const renderDayCell = (dateObj, index, className) => {
    if (!dateObj) return <div key={`empty-${index}`} className={className} />;

    const isSelected = dateObj.getTime() === selectedDate.getTime();
    const isToday = dateObj.getTime() === today.getTime();
    const status = getDayStatus(dateObj);

    return (
      <div 
        key={dateObj.getTime()} 
        onClick={() => onDateChange(dateObj)}
        className={`${className} ${getStatusStyles(status, isSelected, isToday)}`}
      >
        <span className="text-xs uppercase opacity-70 mb-1 md:hidden">
           {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
        </span>
        <span className="text-lg md:text-sm">
          {dateObj.getDate()}
        </span>
        {status === 'completed' && <span className="text-lg md:text-xl leading-none mt-1">🎉</span>}
        {status === 'partial' && <span className="text-lg md:text-xl leading-none mt-1">😢</span>}
        {status === 'missed' && <span className="text-lg md:text-xl leading-none mt-1">😭</span>}
      </div>
    );
  };

  return (
    <div className="w-full">
      
      {/* Desktop / Tablet Grid View (Hidden on Mobile) */}
      <div className="hidden md:block overflow-hidden relative min-h-[320px]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-display font-bold text-text-primary text-lg">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-surface-alt text-text-secondary transition-colors"><FaChevronLeft size={12} /></button>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-surface-alt text-text-secondary transition-colors"><FaChevronRight size={12} /></button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-text-secondary uppercase tracking-wider">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => <div key={d}>{d}</div>)}
        </div>

        {/* Animated Calendar Grid */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentMonth.toISOString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="grid grid-cols-7 gap-2"
          >
            {grid.map((dateObj, i) => renderDayCell(dateObj, i, "aspect-square w-full"))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Horizontal Week View (Hidden on Desktop) */}
      <div className="md:hidden">
        <h3 className="font-display font-bold text-text-primary text-lg mb-3 px-1">
          This Week
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
          {mobileWeek.map((dateObj, i) => (
             <div key={dateObj.getTime()} className="snap-center shrink-0 w-[22vw]">
                {renderDayCell(dateObj, i, "aspect-[3/4] w-full")}
             </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProgressCalendar;
