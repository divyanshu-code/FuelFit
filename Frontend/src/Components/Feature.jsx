import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    { icon: "🥗", title: "Personalized Meal Plans", text: "Get meal plans crafted just for you — based on your goals, diet type, and preferences." },
    { icon: "📊", title: "Calorie & Nutrition Tracking", text: "Track calories and nutrients easily to stay on top of your health goals." },
    { icon: "🤖", title: "AI-Driven Suggestions", text: "Let smart AI guide you on what to eat next for best results." },
    { icon: "💪", title: "Goal-Based Plans", text: "FuelFit adjusts your plan based on your current progress and fitness goals." },
    { icon: "⏰", title: "Smart Meal Reminders", text: "Stay on track with timely reminders for every meal of the day." },
    { icon: "📈", title: "Progress Tracking Dashboard", text: "Visualize your journey with charts and progress reports." },
  ];

  return (
    <section id="feature" className=" lg:mt-0 lg:h-[145vh] h-[320vh] mt-60 bg-gradient-to-b from-white to-green-100 text-gray-800 py-20 px-6 md:px-16">
      <div className="max-w-7xl mt-15 mx-auto  text-center ">
        <motion.h2
          className="lg:text-4xl text-3xl font-bold text-green-600"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Why Choose FuelFit?
        </motion.h2>
        <motion.p
          className="text-gray-600 lg:mt-2 lg:text-lg font-normal  text-md lg:mb-20 mb-10 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          We make healthy eating easy, smart, and sustainable — all adapt to your personal goals.
        </motion.p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-green-50 p-8 rounded-xl shadow-xl hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-green-600 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
