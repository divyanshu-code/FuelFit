import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FiTarget, FiActivity, FiPieChart } from "react-icons/fi";
import Button from "./UI/Button";

const ProfileBanner = ({ user, bmi, bmiStatus }) => {
    const containerRef = useRef(null);
    const bentoRef = useRef([]);

    // Refs for custom animation
    const ring1Ref = useRef(null);
    const ring2Ref = useRef(null);
    const ring3Ref = useRef(null);
    const coreRef = useRef(null);

    // Determine BMI color
    let bmiColorClass = "text-brandGreen-500 bg-brandGreen-50";
    if (bmiStatus === "Overweight" || bmiStatus === "Underweight") {
        bmiColorClass = "text-[#F2803D] bg-[#F2803D]/10";
    } else if (bmiStatus === "Obese") {
        bmiColorClass = "text-red-500 bg-red-50";
    }

    useGSAP(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            gsap.set(bentoRef.current, { opacity: 1, y: 0 });
            return;
        }

        gsap.fromTo(
            bentoRef.current,
            { opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' },
            { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.1 }
        );

        // Custom Abstract Core Animations
        gsap.to(ring1Ref.current, { rotation: 360, duration: 25, repeat: -1, ease: "none" });
        gsap.to(ring2Ref.current, { rotation: -360, duration: 30, repeat: -1, ease: "none" });
        gsap.to(ring3Ref.current, { rotation: 360, duration: 15, repeat: -1, ease: "none" });

        gsap.to(coreRef.current, {
            scale: 1.08,
            boxShadow: "0px 0px 60px rgba(242, 128, 61, 0.8)",
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        gsap.to(containerRef.current.querySelector('.float-wrapper'), {
            y: -15,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 lg:px-12 py-10 gap-12 min-h-screen" id="home">

            {/* Left Column: Greeting & Bento Box */}
            <div className="order-2 lg:order-1 flex flex-col w-full lg:w-3/5 z-10 relative">
                <div ref={el => bentoRef.current[0] = el} className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-3">
                        Welcome back,<br />
                        <span className="text-brandOrange-500 leading-tight">{user?.name || "Athlete"}</span> <span className="wave inline-block origin-bottom-right">👋</span>
                    </h1>
                    <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-lg">
                        Your personalized dashboard. Track your stats, monitor your nutrition, and crush your goals.
                    </p>
                </div>

                {/* Bento Box Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-5">

                    {/* Goal Card (Spans 2 cols on mobile) */}
                    <div ref={el => bentoRef.current[1] = el} className="col-span-2 md:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-white/40">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-[#F2803D]/10 text-[#F2803D] flex items-center justify-center">
                                <FiTarget size={20} />
                            </div>
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Current Goal</span>
                        </div>
                        <p className="text-xl md:text-2xl font-display font-extrabold text-text-primary capitalize">{user.fitnessGoal}</p>
                    </div>

                    {/* Meal Type Card */}
                    <div ref={el => bentoRef.current[2] = el} className="col-span-2 md:col-span-1 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-white/40">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-brandGreen-50 text-brandGreen-500 flex items-center justify-center">
                                <FiPieChart size={20} />
                            </div>
                            <span className="text-sm font-bold text-text-secondary uppercase tracking-wider">Diet</span>
                        </div>
                        <p className="text-xl font-display font-extrabold text-text-primary capitalize">{user.mealtype}</p>
                    </div>

                    {/* Physical Stats Combo Card (Spans full width) */}
                    <div ref={el => bentoRef.current[3] = el} className="col-span-2 md:col-span-3 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-white/40 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex w-full justify-between sm:justify-start gap-30">
                            <div>
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1">Weight</span>
                                <p className="text-2xl font-display font-extrabold text-text-primary">{user.weight} <span className="text-sm font-body text-text-secondary">kg</span></p>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1">Height</span>
                                <p className="text-2xl font-display font-extrabold text-text-primary">{user.height} <span className="text-sm font-body text-text-secondary">cm</span></p>
                            </div>
                        </div>

                        {/* BMI Badge */}
                        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-4 bg-surface p-4 rounded-xl border border-surface-border/50">
                            <div>
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1">BMI Score</span>
                                <p className="text-2xl font-display font-extrabold text-text-primary">{bmi}</p>
                            </div>
                            <div className={`px-4 py-2 rounded-lg font-bold text-sm ${bmiColorClass}`}>
                                {bmiStatus}
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={el => bentoRef.current[4] = el} className="flex">
                    <Link to="/progress" className="w-full sm:w-auto">
                        <Button variant="flame" className="w-full sm:w-auto py-3.5 px-8 text-base shadow-medium hover:shadow-strong transition-all transform hover:-translate-y-1">
                            <FiActivity className="inline mr-2 mb-0.5" /> View Progress Analytics
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Right Column: Custom Animated Core */}
            <div className="order-1 lg:order-2 w-full lg:w-2/5 flex justify-center items-center z-10 relative min-h-[350px]">
                {/* Decorative background glow for animation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brandGreen-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                {/* Floating Wrapper */}
                <div className="float-wrapper relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">

                    {/* Outer Dashed Ring */}
                    <div ref={ring1Ref} className="absolute inset-0 rounded-full border border-brandGreen-500/40 border-dashed border-[3px]"></div>

                    {/* Middle Broken Ring */}
                    <div ref={ring2Ref} className="absolute inset-6 rounded-full border border-[#F2803D]/50 border-t-transparent border-b-transparent border-[4px]"></div>              {/* Inner Solid Ring */}
                    <div ref={ring3Ref} className="absolute inset-14 rounded-full border border-brandGreen-500/60 border-l-transparent border-[5px]"></div>

                    {/* Center Core */}
                    <div ref={coreRef} className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#F2803D] to-brandGreen-500 shadow-[0_0_40px_rgba(242,128,61,0.5)] flex items-center justify-center border-4 border-white/20 backdrop-blur-md">
                        <FiActivity size={48} className="text-white drop-shadow-md" />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ProfileBanner;
