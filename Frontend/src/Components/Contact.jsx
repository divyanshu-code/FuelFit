import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from '../assets/FuelFit.png'
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
    <footer className="bg-green-800  text-white py-12 px-6 md:px-16" id="contact">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-20">

        <div className="md:w-1/3 text-center lg:text-left">
          <a href="#home" className="inline-block w-40 h-16  "><img src={logo} alt="FuelFit Logo" /></a>
          <p className="text-gray-100 ml-2 italic leading-tight">
            <span className="font-semibold font-mono ">Welcome to FuelFit!</span>   <br />
            Your personal guide to healthy eating and smart fitness. Plan meals, track progress, and stay fit.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-center font-semibold mb-4">Quick Links</h3>
          <ul className="lg:space-y-2 space-y-1.5 text-center">
            <li><a href="#home" className="hover:text-green-200 transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-green-200 transition-colors">About</a></li>
            <li><a href="#feature" className="hover:text-green-200 transition-colors">Features</a></li>
            <li><a href="#contact" className="hover:text-green-200 transition-colors">Contact</a></li>
            <li><button onClick={() => setlogin(true)} className="hover:text-green-200 transition-colors cursor-pointer">Login</button></li>
          </ul>
        </div>

        <div className="md:w-1/3 space-y-4 ">
          <h3 className="text-xl font-semibold mb-2 text-center lg:text-left">Follow Us</h3>
          <div className="flex gap-4 text-2xl justify-center lg:justify-start">
            <a href="#" className="hover:text-green-200 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-green-200 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-green-200 transition-colors"><FaLinkedin /></a>
            <a href="#" className="hover:text-green-200 transition-colors"><FaYoutube /></a>
            <div>
              <MdFeedback onClick={() => {
                setOpenFeedback(true);
              }} size={30} className="text-black cursor-pointer" alt="Feedback" />
            </div>
          </div>

          <div onClick={() => {
            setOpenFAQ(true);
          }} className="fixed lg:bottom-6 right-5 bottom-9 lg:right-15 lg:w-12 lg:h-12 w-11 h-11 bg-green-600 rounded-full flex items-center justify-center  hover:bg-green-500 cursor-pointer transition-colors" >
            <img src="https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-faq-icon-on-white-background-png-image_4915284.png" alt="" />
          </div>

          {openFAQ && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-xs" ref={FAQpanel}>

              <FAQSection Closeref={Closeref} setOpenFAQ={setOpenFAQ} />

            </div>
          )}
        </div>

        {openFeedback && (
          <div  ref={FeedbackRef}>
            <Feedback Closeref={Closeref} setOpenFeedback={setOpenFeedback} />
          </div>
        )}

      </div>

      <div className="mt-12 border-t border-green-400 pt-6 text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} FuelFit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
