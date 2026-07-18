import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-primary/40 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-surface-card border border-surface-border rounded-xl shadow-strong z-50 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              {title && <h2 className="text-h3 font-display text-text-primary font-bold">{title}</h2>}
              <button 
                onClick={onClose}
                className="text-text-muted hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-brandOrange-500 rounded-sm transition-colors"
              >
                <RxCross2 size={24} />
              </button>
            </div>
            <div className="text-text-secondary font-body">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
