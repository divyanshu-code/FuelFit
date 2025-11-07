import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

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
    question: "Does FuelFit work for both vegetarians and non-vegetarians?",
    answer: "Yes! FuelFit recommends meal options for both dietary preferences based on your fitness goals."
  },
  {
    question: "Can I track my calories and nutrients?",
    answer: "Absolutely! FuelFit provides easy tracking for calories, macros, and nutrients to help you stay on track."
  }, {
    question: "Can FuelFit suggest meals for muscle gain and fat loss?",
    answer: "Definitely! You can select your fitness goal—like weight loss, muscle gain, or maintenance — and FuelFit adapts meals accordingly."
  }, {
    question: "Is my data secure on FuelFit?",
    answer: "Yes, we prioritize your privacy. Your data is securely stored and never shared with third parties."
  },
  {
    question: "Will FuelFit include exercise or workout recommendations?",
    answer: "We’re planning to integrate personalized workout suggestions in upcoming updates."
  },
  {
    question: "Do I need an account to use FuelFit?",
    answer: "yes , creating an account helps save your progress and personalize your experience."
  },
  {
    question: "Can I share my meal plan with my trainer or friends?",
    answer: "Yes! You’ll soon be able to share your plans and progress with others directly from your dashboard."
  }
];

const FAQSection = ({ Closeref  , setOpenFAQ }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" overflow-y-scroll m-3 text-gray-800">

      <div className=" w-full md:w-[700px] max-h-[80vh] overflow-y-auto border-white shadow-2xl rounded-md bg-green-100 lg:p-10  p-5 ">
        <RxCross2 size={24} className=" text-gray-600 relative top-0  lg:left-148 left-68 hover:text-red-500 cursor-pointer"  ref={Closeref} onClick={() => setOpenFAQ(false) } />
        <motion.h2
          className="lg:text-3xl text-lg lg:mt-0 mt-2 font-bold text-green-600 text-center"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="text-gray-600  lg:text-[1rem] text-xs font-semibold lg:font-normal lg:mb-10 mb-5 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Here are some common questions people have when starting their fitness journey.
        </motion.p>


        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded shadow-md lg:px-4 px-2 lg:py-2 py-1 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-[0.9rem] lg:text-lg font-semibold text-green-600">{faq.question}</h3>
                {openIndex === index ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
              </div>
              {openIndex === index && (
                <motion.p
                  className=" text-gray-600  lg:text-[0.9rem] text-xs mb-2 font-semibold mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
