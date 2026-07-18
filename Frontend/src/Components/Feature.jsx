import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiCalendar, FiPieChart, FiCpu, FiTarget, FiBell, FiTrendingUp } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    { icon: <FiCalendar size={26} />, title: "Personalized Meal Plans", text: "Get meal plans crafted just for you — based on your goals, diet type, and preferences." },
    { icon: <FiPieChart size={26} />, title: "Calorie & Nutrition Tracking", text: "Track calories and nutrients easily to stay on top of your health goals." },
    { icon: <FiCpu size={26} />, title: "AI-Driven Suggestions", text: "Let smart AI guide you on what to eat next for best results." },
    { icon: <FiTarget size={26} />, title: "Goal-Based Plans", text: "FuelFit adjusts your plan based on your current progress and fitness goals." },
    { icon: <FiBell size={26} />, title: "Smart Meal Reminders", text: "Stay on track with timely reminders for every meal of the day." },
    { icon: <FiTrendingUp size={26} />, title: "Progress Tracking Dashboard", text: "Visualize your journey with charts and progress reports." },
  ];

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(titleRef.current.children, { opacity: 1, y: 0 });
      gsap.set(cardsRef.current, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(
      titleRef.current.children,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" }
    ).fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.2"
    );
  }, { scope: containerRef });

  return (
    <section id="feature" ref={containerRef} className="text-text-primary pt-24 pb-52 px-6 md:px-16 overflow-hidden">
      <div ref={titleRef} className="max-w-7xl mx-auto text-center mb-16 flex flex-col items-center">
        <h2 className="text-lg md:text-2xl font-display font-bold text-text-primary  relative inline-block">
          Why Choose FuelFit?
          {/* Flame Gradient Underline */}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 rounded-full bg-flame-gradient"></span>
        </h2>
        <p className="text-gray-500 font-body text-lg md:text-xl max-w-2xl mx-auto italic  leading-relaxed">
          We make healthy eating easy, smart, and sustainable — all adapt to your personal goals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const isFeatured = index === 1;

          return (
            <div key={index} ref={(el) => (cardsRef.current[index] = el)}>
              <div
                className={`group bg-white h-full flex flex-col items-start rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 border border-transparent 
                  ${isFeatured
                    ? 'border-t-4 border-t-[#F2803D] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_-4px_rgba(0,0,0,0.15)]'
                    : 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]'
                  }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300
                    ${isFeatured
                      ? 'bg-[#F2803D]/10 text-[#F2803D] group-hover:bg-[#F2803D]/20'
                      : 'bg-[#3AA33A]/10 text-[#3AA33A] group-hover:bg-[#3AA33A]/20'
                    }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary font-body leading-relaxed">{feature.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
