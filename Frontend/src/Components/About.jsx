import React, { useRef, useEffect } from "react";
import Button from "./UI/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaLeaf, FaFire, FaUtensils } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const AboutVisual = () => {
  return (
    <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
      {/* Background soft glow blobs */}
      <div className="absolute inset-10 bg-gradient-to-tr from-brandGreen-500/15 to-brandOrange-500/15 rounded-full blur-[70px] pointer-events-none about-glow-bg"></div>

      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 drop-shadow-2xl overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="about-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2803D" />
            <stop offset="100%" stopColor="#E53E3E" />
          </linearGradient>
          <linearGradient id="about-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3AA33A" />
            <stop offset="100%" stopColor="#2D8A2D" />
          </linearGradient>
          <filter id="about-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Decorative Grid Lines */}
        <line x1="50" y1="200" x2="350" y2="200" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="6 8" strokeOpacity="0.5" className="about-grid-line" />
        <line x1="200" y1="50" x2="200" y2="350" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="6 8" strokeOpacity="0.5" className="about-grid-line" />

        {/* Outer Circular Track */}
        <circle cx="200" cy="200" r="180" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="8 8" className="about-track" />

        {/* Segmented Macro Plate */}
        <g className="transition-all duration-300 hover:translate-x-2 hover:-translate-y-2 cursor-pointer group">
          <path d="M 200 200 L 200 60 A 140 140 0 0 1 330 250 Z" fill="url(#about-orange)" opacity="0.9" filter="url(#about-glow)" className="about-plate-segment" />
        </g>

        <g className="transition-all duration-300 hover:translate-y-2 cursor-pointer group">
          <path d="M 190 200 L 330 250 A 140 135 0 0 1 90 290 Z" fill="#F7F5F0" stroke="#F2803D" strokeWidth="2" className="about-plate-segment" />
        </g>

        <g className="transition-all duration-300 hover:-translate-x-2 hover:-translate-y-1 cursor-pointer group">
          <path d="M 200 200 L 90 290 A 140 140 0 0 1 200 60 Z" fill="url(#about-green)" opacity="0.85" filter="url(#about-glow)" className="about-plate-segment" />
        </g>

        {/* Overlaying Details (Inner Plate Ring) */}
        <circle cx="200" cy="200" r="65" fill="white" filter="url(#about-glow)" className="about-inner-ring" />
        <circle cx="200" cy="200" r="50" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4 4" className="about-inner-dashed" />

        {/* Central Small Flame Icon */}
        <path d="M200 183 C208 195, 215 206, 215 213 C215 222, 208 226, 200 226 C192 226, 185 222, 185 213 C185 204, 192 193, 200 183 Z" fill="url(#about-orange)" className="about-flame" />

        {/* Orbiting Leaves */}
        <g className="about-orbit-group">
          <g transform="translate(260, 30)">
            <g className="about-leaf-icon">
              <path d="M -8 -8 C 15 -8, 20 10, 8 18 C -12 15, -12 -2, -8 -8 Z" fill="url(#green-grad)" />
              <path d="M -8 -8 L 4 4" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>
          <g transform="translate(350, 280)">
            <g className="about-leaf-icon">
              <path d="M -8 -8 C 15 -8, 20 10, 8 18 C -12 15, -12 -2, -8 -8 Z" fill="url(#green-grad)" />
              <path d="M -8 -8 L 4 4" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>

          <g transform="translate(30, 190)">
            <g className="about-leaf-icon">
              <path d="M -8 -8 C 15 -8, 20 10, 8 18 C -12 15, -12 -2, -8 -8 Z" fill="url(#green-grad)" />
              <path d="M -8 -8 L 4 4" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([visualRef.current, contentRef.current.children, statsRef.current.children], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // ScrollTrigger Timeline for main entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(
      visualRef.current,
      { opacity: 0, scale: 0.8, x: -40 },
      { opacity: 1, scale: 1, x: 0, duration: 1, ease: "back.out(1.2)" }
    ).fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.6"
    ).fromTo(
      statsRef.current.children,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.2"
    );

    // Number Counter Animation
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      ScrollTrigger.create({
        trigger: counter,
        start: "top 90%",
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: "power2.out"
          });
        }
      });
    });

    // Continuous floating animations for SVG
    gsap.to(".about-flame", {
      y: -5,
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".about-orbit-group", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      svgOrigin: "200 200"
    });

    gsap.to(".about-leaf-icon", {
      rotation: -360,
      duration: 20,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%"
    });

    gsap.to(".about-glow-bg", {
      scale: 1.1,
      opacity: 0.8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="text-text-primary py-28 px-6 md:px-16 overflow-hidden border-surface-border/40 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative z-10">

        <div ref={visualRef} className="md:w-1/2 flex justify-center w-full">
          <AboutVisual />
        </div>

        <div ref={contentRef} className="md:w-1/2 flex flex-col space-y-6 text-left">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-brandGreen-500 block mb-2 font-display">
              About FuelFit
            </span>
            <h2 className="text-h2 md:text-h1 font-display font-bold text-text-primary leading-tight">
              Smart Eating, <br />
              <span className="bg-clip-text text-transparent bg-flame-gradient">Made Simple.</span>
            </h2>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed font-body">
            At <span className="font-bold text-brandGreen-500">FuelFit</span>, we believe that fitness starts in the kitchen.
            With so many food choices available today, it can be overwhelming to know what’s right for your unique body.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed font-body">
            Our mission is to guide people who want to get fit — helping them understand
            <strong className="text-text-primary"> exactly what to eat and when</strong>,
            based entirely on their individual fitness goals. Whether your aim is to lose weight, gain muscle,
            or simply stay healthy, FuelFit creates the perfect personalized plan for you.
          </p>

          {/* Premium Glassmorphism Stats Cards */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/60 backdrop-blur-md border border-white/50 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#3AA33A]/10 text-[#3AA33A]">
                  <FaLeaf size={16} />
                </div>
                <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Meals</p>
              </div>
              <p className="text-2xl font-display font-bold text-text-primary leading-none">
                <span className="stat-counter" data-target="15">0</span>k+
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/60 backdrop-blur-md border border-white/50 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#F2803D]/10 text-[#F2803D]">
                  <FaFire size={16} />
                </div>
                <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Success</p>
              </div>
              <p className="text-2xl font-display font-bold text-text-primary leading-none">
                <span className="stat-counter" data-target="98">0</span>%
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/60 backdrop-blur-md border border-white/50 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#3182CE]/10 text-[#3182CE]">
                  <FaUtensils size={16} />
                </div>
                <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Recipes</p>
              </div>
              <p className="text-2xl font-display font-bold text-text-primary leading-none">
                <span className="stat-counter" data-target="500">0</span>+
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              onClick={() => document.getElementById('feature').scrollIntoView()}
              className="py-3 px-8 text-base shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
