import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from '../assets/Fuelfit.png'
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FAQSection from "./FAQSection";
import { MdFeedback } from "react-icons/md";
import Feedback from "./Feedback";

const Footer = ({ setlogin }) => {

  const [openFAQ, setOpenFAQ] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);

  const FAQpanel = useRef(null);
  const Closeref = useRef(null);
  const FeedbackRef = useRef(null);

  useGSAP(() => {

    if (openFAQ) {

      gsap.to(FAQpanel.current, {
        height: '100%',
        duration: 0.5,
        ease: 'power2.Out',
        opacity: 1,
      })
      gsap.to(Closeref.current, {
        opacity: 1,

      })
    } else {
      gsap.to(FAQpanel.current, {
        height: '0%',
        duration: 0.5,
        ease: 'power2.inOut',
        opacity: 0,
      })
      gsap.to(Closeref.current, {
        opacity: 0,

      })
    }

  }, [openFAQ]);

  useGSAP(() => {

    if (openFeedback) {

      gsap.to(FeedbackRef.current, {
        height: '100%',
        duration: 0.5,
        ease: 'power2.Out',
        opacity: 1,
      })
      gsap.to(Closeref.current, {
        opacity: 1,

      })
    } else {
      gsap.to(FeedbackRef.current, {
        height: '0%',
        duration: 0.5,
        ease: 'power2.inOut',
        opacity: 0,
      })
      gsap.to(Closeref.current, {
        opacity: 0,

      })
    }

  }, [openFeedback]);

  return (
    <footer className="relative overflow-hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 text-white pt-24 pb-12 px-6 md:px-16 font-body shadow-[0_-10px_40px_rgba(0,0,0,0.1)] mt-20" id="contact">
      
      {/* Decorative Orbs inside Footer */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brandGreen-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brandOrange-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">

        {/* Column 1: Brand & Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a href="#home" className="inline-block bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-soft mb-6 hover:shadow-medium hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
            <img src={logo} alt="FuelFit Logo" className="w-32 md:w-36 brightness-0 invert opacity-90" />
          </a>
          <p className="text-white/70 leading-relaxed text-sm max-w-sm">
            <span className="font-bold font-display text-white text-lg block mb-3 bg-clip-text text-transparent bg-gradient-to-r from-brandGreen-400 to-brandOrange-400">Fuel Your Body, Fit Your Goals.</span>
            Your premium guide to healthy eating and smart fitness. Plan meals, track progress, and conquer your goals.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-display font-bold mb-6 text-white tracking-wide uppercase text-sm opacity-90">Quick Links</h3>
          <ul className="space-y-4 text-md flex flex-col items-center">
            <li>
              <a href="#home" className="group text-white/70 hover:text-brandGreen-400 inline-flex items-center transition-colors duration-300">
                <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-brandGreen-400 font-bold">&rarr;</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
              </a>
            </li>
            <li>
              <a href="#about" className="group text-white/70 hover:text-brandGreen-400 inline-flex items-center transition-colors duration-300">
                <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-brandGreen-400 font-bold">&rarr;</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">About</span>
              </a>
            </li>
            <li>
              <a href="#feature" className="group text-white/70 hover:text-brandGreen-400 inline-flex items-center transition-colors duration-300">
                <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-brandGreen-400 font-bold">&rarr;</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Features</span>
              </a>
            </li>
            <li>
              <button onClick={() => setlogin(true)} className="group text-white/70 hover:text-brandGreen-400 inline-flex items-center transition-colors duration-300">
                <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-brandGreen-400 font-bold">&rarr;</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Login</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Socials & Feedback */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-display font-bold mb-6 text-white tracking-wide uppercase text-sm opacity-90">Connect With Us</h3>
          <div className="flex flex-wrap gap-4 text-xl justify-center md:justify-start mb-8">
            <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 hover:border-transparent hover:-translate-y-1 hover:shadow-strong transition-all duration-300"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-blue-500 hover:border-transparent hover:-translate-y-1 hover:shadow-strong transition-all duration-300"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-blue-700 hover:border-transparent hover:-translate-y-1 hover:shadow-strong transition-all duration-300"><FaLinkedin /></a>
            <a href="#" aria-label="YouTube" className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-red-600 hover:border-transparent hover:-translate-y-1 hover:shadow-strong transition-all duration-300"><FaYoutube /></a>
            <button aria-label="Feedback" onClick={() => setOpenFeedback(true)} className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-brandOrange-400 hover:bg-brandOrange-500 hover:text-white hover:border-transparent hover:-translate-y-1 hover:shadow-strong transition-all duration-300">
              <MdFeedback size={24} />
            </button>
          </div>

          <button
            aria-label="FAQ"
            onClick={() => setOpenFAQ(true)}
            className="fixed lg:bottom-6 right-5 bottom-9 lg:right-15 w-12 h-12 bg-brandGreen-500 rounded-full flex items-center justify-center hover:bg-brandGreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-text-primary focus:ring-brandGreen-400 cursor-pointer shadow-strong transition-all hover:scale-105 active:scale-95 z-40"
          >
            <img src="https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-faq-icon-on-white-background-png-image_4915284.png" alt="FAQ" className="w-10 h-10" style={{ filter: 'brightness(0) invert(1)' }} />
          </button>

          {openFAQ && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" ref={FAQpanel}>
              <FAQSection Closeref={Closeref} setOpenFAQ={setOpenFAQ} />
            </div>
          )}
        </div>

        {openFeedback && (
          <div ref={FeedbackRef} className="fixed inset-0 z-50">
            <Feedback Closeref={Closeref} setOpenFeedback={setOpenFeedback} />
          </div>
        )}

      </div>

      {/* Copyright Bar */}
      <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-sm max-w-7xl mx-auto relative z-10">
        Copyright © {new Date().getFullYear()} FuelFit | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
