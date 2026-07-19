import React, { useRef, useState, useEffect } from "react";
import About from "./About";
import Features from "./Feature";
import Contact from "./Contact";
import Navbar from "./Navbar";
import Button from "./UI/Button";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ParticleCanvas from "./UI/ParticleCanvas";

const HeroVisual = () => {
  const CENTER = 290;
  const ORBIT_RADIUS = 180;

  const TOP_Y = CENTER - ORBIT_RADIUS; // 70
  const BOTTOM_Y = CENTER + ORBIT_RADIUS; // 430
  const LEFT_X = CENTER - ORBIT_RADIUS; // 70
  const RIGHT_X = CENTER + ORBIT_RADIUS; // 430

  return (
    <div className="relative w-full max-w-md lg:max-w-lg aspect-square flex items-center justify-center">
      {/* Decorative Glow Layer */}
      <div id="visual-glow" className="absolute inset-10 bg-flame-gradient opacity-15 blur-[65px] rounded-full"></div>

      <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl select-none relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <defs>
          <linearGradient id="flame-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2803D" />
            <stop offset="100%" stopColor="#E53E3E" />
          </linearGradient>
          <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3AA33A" />
            <stop offset="100%" stopColor="#2D8A2D" />
          </linearGradient>
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Track */}
        <circle id="track-ring" cx="250" cy="250" r="180" stroke="#F2803D" strokeWidth="2" strokeDasharray="8 12" strokeOpacity="0.4" />

        {/* Central Flame Group */}
        <g id="center-group" transform="translate(250, 250)">
          <circle r="45" fill="white" filter="url(#glow-filter)" opacity="0.95" />
          <g transform="translate(-22.5, -24.75) scale(0.45)">
            <path d="M50 5 C68 35, 85 62, 85 80 C85 98, 69 105, 50 105 C31 105, 15 98, 15 80 C15 58, 32 30, 50 5 Z" fill="url(#flame-grad)" />
            <path d="M50 35 C58 50, 68 65, 68 75 C68 85, 60 90, 50 90 C40 90, 32 85, 32 75 C32 63, 42 48, 50 35 Z" fill="#FFF" opacity="0.95" />
          </g>
        </g>

        {/* Orbiting Group */}
        <g id="orbit-group">

          {/* Icon 1: Green Leaf (Top) */}
          <g transform={`translate(${CENTER}, ${TOP_Y})`}>
            <g className="orbit-icon">
              <circle r="40" cx="0" cy="0" fill="transparent" />
              <circle r="30" fill="white" className="shadow-sm" filter="url(#glow-filter)" opacity="0.95" />
              <path d="M -8 -8 C 15 -8, 20 10, 8 18 C -12 15, -12 -2, -8 -8 Z" fill="url(#green-grad)" />
              <path d="M -8 -8 L 4 4" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>

          {/* Icon 2: Food Bowl (Right) */}
          <g transform={`translate(${RIGHT_X}, ${CENTER})`}>
            <g className="orbit-icon">
              <circle r="40" cx="0" cy="0" fill="transparent" />
              <circle r="30" fill="white" className="shadow-sm" filter="url(#glow-filter)" opacity="0.95" />
              <path d="M -15 0 A 15 15 0 0 0 15 0 Z" fill="url(#flame-grad)" />
              <path d="M -12 -2 Q -6 -12 0 -2 M 0 -2 Q 6 -12 12 -2" stroke="#3AA33A" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>

          {/* Icon 3: Dumbbell (Bottom) */}
          <g transform={`translate(${CENTER}, ${BOTTOM_Y})`}>
            <g className="orbit-icon">
              <circle r="40" cx="0" cy="0" fill="transparent" />
              <circle r="30" fill="white" className="shadow-sm" filter="url(#glow-filter)" opacity="0.95" />
              <g transform="rotate(45)">
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#4A5568" strokeWidth="5" strokeLinecap="round" />
                <rect x="-16" y="-10" width="4" height="20" rx="2" fill="url(#green-grad)" />
                <rect x="-22" y="-6" width="4" height="12" rx="1.5" fill="url(#green-grad)" />
                <rect x="12" y="-10" width="4" height="20" rx="2" fill="url(#green-grad)" />
                <rect x="18" y="-6" width="4" height="12" rx="1.5" fill="url(#green-grad)" />
              </g>
            </g>
          </g>

          {/* Icon 4: Fuel (Left) */}
          <g transform={`translate(${LEFT_X}, ${CENTER})`}>
            <g className="orbit-icon">
              <circle r="40" cx="0" cy="0" fill="transparent" />
              <circle r="30" fill="white" className="shadow-sm" filter="url(#glow-filter)" opacity="0.95" />
              <path d="M 0 -12 L -8 2 L -2 2 L -2 14 L 8 0 L 2 0 Z" fill="url(#flame-grad)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

const Home = ({ setlogin }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const lottieRef = useRef(null);
  const [sloganIdx, setSloganIdx] = useState(0);
  const slogans = ["Fit.", "Strong.", "Active.", "Fueled."];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slogans.length;
      const el = document.getElementById("slogan-word");
      if (el) {
        gsap.to(el, {
          y: -15,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            el.innerText = slogans[currentIndex];
            gsap.fromTo(el,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }
            );
          }
        });
      }
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Instantly render static final states
      gsap.set("#track-ring", { strokeDashoffset: 0 });
      gsap.set("#center-group", { scale: 1, opacity: 1 });
      gsap.set(".orbit-icon", { opacity: 0.95, scale: 1 });
      gsap.set(textRef.current.children, { y: 0, opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Text Content Entrance
    tl.fromTo(
      textRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, delay: 0.1 }
    );

    // SVG Drawing & Scaling Entrance
    tl.fromTo(
      "#center-group",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    )
      .fromTo(
        "#track-ring",
        { opacity: 0, scale: 0.8, transformOrigin: "250px 250px" },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".orbit-icon",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.95, duration: 0.6, stagger: 0.15, ease: "back.out(1.5)" },
        "-=0.8"
      )


    // Continuous Orbital Animation
    // 1. Rotate the entire orbit group
    gsap.to("#orbit-group", {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: "none",
      svgOrigin: "250 250"
    });

    // 2. Counter-rotate the individual icons to keep them upright!
    gsap.to(".orbit-icon", {
      rotation: -360,
      duration: 25,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%"
    });

  }, { scope: heroRef });

  return (
    <>
      <Navbar setlogin={setlogin} />

      <div className="premium-bg-mesh" id="home">
        <div ref={heroRef} className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen pt-32 pb-12 lg:pt-32 lg:pb-0 overflow-hidden px-6 lg:px-20 lg:gap-0">

          {/* Particle Canvas */}
          <ParticleCanvas />

          {/* Architectural Layout Grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E0D9_1px,transparent_1px),linear-gradient(to_bottom,#E2E0D9_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-40 pointer-events-none z-0"></div>

          {/* Monospace Tech Labels */}
          <div className="absolute top-24 left-10 text-[10px] font-mono text-text-muted select-none hidden lg:block tracking-widest">[ SYS_ACTIVE : FUEL_FIT_V2 ]</div>
          <div className="absolute top-24 right-10 text-[10px] font-mono text-text-muted select-none hidden lg:block tracking-widest">[ GOAL_TARGET : 100% ]</div>
          <div className="absolute bottom-10 left-10 text-[10px] font-mono text-text-muted select-none hidden lg:block tracking-widest">[ ENGINE_STABLE : OK ]</div>

          {/* Large Highly-Blurred Flame-Gradient Backdrop Blobs for Depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brandOrange-500/10 to-brandGreen-500/5 rounded-full filter blur-[140px] pointer-events-none"></div>

          {/* Text Content */}
          <section
            ref={textRef}
            className="order-2 lg:order-1 flex flex-col lg:w-1/2 text-center lg:text-left z-10 mt-8 lg:mt-0 lg:ml-20"
          >
            <h1 className="text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[3.75rem] font-display font-extrabold text-text-primary mb-6 leading-[1.08] tracking-tight">
              Plan Smart.<br className="hidden lg:block" /> Eat Right.<br className="hidden lg:block" /> Stay <span id="slogan-word" style={{ color: '#3AA33A' }}>Fit.</span>
            </h1>

            <p className="text-text-secondary font-body text-md md:text-md font-semibold max-w-xl mx-auto lg:mx-0 mb-8 leading-tight">
              <span className="font-bold text-text-primary text-xl md:text-2xl block mb-2">Fuel Your Body, Fit Your Goals.</span>
              FuelFit helps you create personalized meal plans based on your fitness goals and lifestyle — designed for both beginners and fitness enthusiasts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => setlogin(true)}
                variant="primary"
                className="text-base py-3 px-8 text-white font-display font-bold shadow-medium hover:shadow-strong transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('about').scrollIntoView()}
                className="text-base py-3 px-8 text-brandGreen-500 font-display font-bold transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn More
              </Button>
            </div>
          </section>

          {/* Custom Visual Illustration */}
          <div ref={lottieRef} className="order-1 lg:order-2 flex justify-center lg:w-1/2 z-10 w-full max-w-md lg:max-w-xl relative">
            <HeroVisual />

            {/* Floating Metric 1: Calories */}
            <div className="absolute top-10 right-0 lg:right-8 z-20 animate-float" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-medium flex items-center gap-2 select-none">
                <span className="text-lg">🔥</span>
                <div className="leading-tight text-left">
                  <p className="text-[9px] text-text-secondary font-bold uppercase tracking-wider font-body">Burned</p>
                  <p className="text-sm font-display font-extrabold text-brandOrange-500">480 kcal</p>
                </div>
              </div>
            </div>

            {/* Floating Metric 2: Plan Badge */}
            <div className="absolute -left-10 bottom-1/3 z-20 animate-float" style={{ animationDelay: '1.5s', animationDuration: '7s' }}>
              <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-medium flex items-center gap-2 select-none">
                <span className="text-lg">🥗</span>
                <div className="leading-tight text-left">
                  <p className="text-[9px] text-text-secondary font-bold uppercase tracking-wider font-body">Keto Diet</p>
                  <p className="text-sm font-display font-extrabold text-brandGreen-500">Active</p>
                </div>
              </div>
            </div>

            {/* Floating Metric 3: Steps */}
            <div className="absolute right-0 bottom-12 z-20 animate-float" style={{ animationDelay: '0.8s', animationDuration: '5s' }}>
              <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-medium flex items-center gap-2 select-none">
                <span className="text-lg">🏃‍♂️</span>
                <div className="leading-tight text-left">
                  <p className="text-[9px] text-text-secondary font-bold uppercase tracking-wider font-body">Steps Goal</p>
                  <p className="text-sm font-display font-extrabold text-text-primary">8.4k / 10k</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <About />
        <Features />
        <Contact setlogin={setlogin} />
      </div>

    </>
  );
};

export default Home;
