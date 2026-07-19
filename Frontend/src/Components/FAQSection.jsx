import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FaRobot, FaUser } from "react-icons/fa";

const faqs = [
  {
    question: "How do I create a personalized meal plan?",
    answer: "Simply input your fitness goals and dietary preferences. FuelFit will generate a plan for you."
  },
  {
    question: "Can I adjust my goals later?",
    answer: "Yes! You can update your goals anytime, and FuelFit will recalculate your meal plans accordingly."
  },
  {
    question: "Is FuelFit free?",
    answer: "Currently, all basic features are completely free. Premium features may be added in the future."
  },
  {
    question: "Does FuelFit work for vegetarians?",
    answer: "Yes! FuelFit recommends meal options for both dietary preferences based on your fitness goals."
  },
  {
    question: "Can I track calories and nutrients?",
    answer: "Absolutely! FuelFit provides easy tracking for calories, macros, and nutrients to help you stay on track."
  },
  {
    question: "Can it suggest meals for muscle gain?",
    answer: "Definitely! You can select your fitness goal—like weight loss, muscle gain, or maintenance — and FuelFit adapts meals accordingly."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we prioritize your privacy. Your data is securely stored and never shared with third parties."
  },
  {
    question: "Will it include workout recommendations?",
    answer: "We’re planning to integrate personalized workout suggestions in upcoming updates."
  }
];

const TypewriterText = ({ text, scrollToBottom }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (scrollToBottom) scrollToBottom();
      if (index >= text.length) clearInterval(interval);
    }, 20); // Fast typing speed
    
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <span>{displayedText}</span>;
};

const FAQSection = ({ setOpenFAQ }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! 👋 I am the FuelFit Assistant. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleFAQClick = (faq) => {
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: faq.question }]);

    // Simulate typing
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: faq.answer }]);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-24 right-5 lg:right-15 w-[90vw] max-w-[380px] h-[550px] max-h-[75vh] z-50 flex flex-col bg-white/80 backdrop-blur-2xl rounded-3xl shadow-strong border border-white/50 overflow-hidden font-body"
    >
      {/* Chat Header */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between shrink-0 shadow-sm relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-brandGreen-50 rounded-full flex items-center justify-center border border-brandGreen-100">
              <FaRobot size={22} className="text-brandGreen-600" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
          </div>
          <div>
            <h3 className="text-slate-800 font-bold text-sm tracking-wide">FuelFit Support</h3>
            <p className="text-slate-500 text-xs">Typically replies instantly</p>
          </div>
        </div>
        <button
          onClick={() => setOpenFAQ(false)}
          className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors focus:outline-none"
        >
          <RxCross2 size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50/50 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center mt-auto ${msg.sender === 'user' ? 'bg-brandOrange-100 text-brandOrange-500' : 'bg-brandGreen-100 text-brandGreen-600'}`}>
                  {msg.sender === 'user' ? <FaUser size={18} /> : <FaRobot size={20} />}
                </div>

                {/* Bubble */}
                <div className={`p-3 rounded-2xl text-sm shadow-sm border ${msg.sender === 'user'
                  ? 'bg-slate-800 text-white border-slate-700 rounded-br-sm'
                  : 'bg-white text-slate-800 border-slate-200 rounded-bl-sm'
                  }`}>
                  {msg.sender === 'bot' && idx !== 0 ? (
                    <TypewriterText text={msg.text} scrollToBottom={scrollToBottom} />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-start w-full"
            >
              <div className="flex gap-2 max-w-[85%] flex-row">
                <div className="w-8 h-8 rounded-full flex shrink-0 items-center justify-center mt-auto bg-brandGreen-100 text-brandGreen-600">
                  <FaRobot size={20} />
                </div>
                <div className="p-4 rounded-2xl rounded-bl-sm bg-white shadow-sm border border-slate-200 flex gap-1.5 items-center justify-center h-10 mt-auto">
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-slate-400 rounded-full"></motion.div>
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-slate-400 rounded-full"></motion.div>
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-slate-400 rounded-full"></motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies (Suggested FAQs) */}
      <div className="p-3 bg-white/60 border-t border-white/40 shrink-0">
        <p className="text-[10px] uppercase tracking-wider font-bold text-text-muted mb-2 px-1">Suggested Questions</p>
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide snap-x">
          {faqs.map((faq, idx) => (
            <button
              key={idx}
              onClick={() => handleFAQClick(faq)}
              disabled={isTyping}
              className="snap-start shrink-0 whitespace-nowrap bg-brandGreen-50 hover:bg-brandGreen-100 border border-brandGreen-200 text-brandGreen-700 text-xs py-2 px-4 rounded-full transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FAQSection;
