import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from "react-icons/rx";
import { FaStar, FaRegCommentDots } from "react-icons/fa";
import { BiCheckCircle } from "react-icons/bi";
import axios from "axios";

const Feedback = ({ setOpenFeedback }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', thoughts: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:4000/api/feedback/submit", {
        ...formData,
        rating
      });

      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setOpenFeedback(false);
        }, 2000);
      } else {
        setErrorMsg(response.data.message || "Failed to send feedback.");
      }
    } catch (error) {
      console.error("Feedback error:", error);
      setErrorMsg("An error occurred while sending feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 font-body"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white w-full max-w-md rounded-3xl shadow-strong p-8 max-h-[90vh] overflow-y-auto scrollbar-hide border border-slate-100"
      >
        <button
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-all focus:outline-none"
          onClick={() => setOpenFeedback(false)}
        >
          <RxCross2 size={20} />
        </button>

        {!isSuccess ? (
          <>
            <div className="text-center mb-8 mt-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-4 shadow-sm border border-green-100">
                <FaRegCommentDots size={32} />
              </div>
              <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">
                We value your feedback
              </h2>
              <p className="text-sm text-slate-500">
                Help us improve FuelFit by sharing your thoughts.
              </p>
              {errorMsg && <p className="text-sm text-red-500 mt-3">{errorMsg}</p>}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Star Rating */}
              <div className="flex flex-col items-center gap-2 mb-2">
                <p className="text-xs uppercase tracking-wider font-bold text-slate-400">Rate your experience</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-all duration-200 transform hover:scale-110 focus:outline-none ${(hoverRating || rating) >= star ? 'text-brandOrange-400' : 'text-slate-200'
                        }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">Your Thoughts</label>
                  <textarea
                    name="thoughts"
                    value={formData.thoughts}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    placeholder="Tell us what you love or what we can improve..."
                    className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all placeholder:text-slate-400 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setOpenFeedback(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-800 transition-colors focus:outline-none disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="flex-1 py-3.5 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 shadow-lg shadow-slate-900/20 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    'Send Feedback'
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="text-green-500 mb-6">
              <BiCheckCircle size={80} />
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">
              Thank You!
            </h2>
            <p className="text-slate-500">
              Your feedback helps us make FuelFit even better.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Feedback;