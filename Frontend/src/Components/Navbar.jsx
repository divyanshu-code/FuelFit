import React, { useState, useEffect } from 'react';
import logo from '../assets/Fuelfit.png';
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from 'framer-motion';
import Button from './UI/Button';

const Navbar = ({ setlogin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed transition-all duration-300 z-50 flex justify-between items-center
            left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:-translate-x-1/2 lg:w-[1000px]
            rounded-2xl md:rounded-full border border-white/40 backdrop-blur-md px-6 md:px-8 
            ${isScrolled ? 'top-3 bg-white/85 shadow-strong py-0' : 'top-5 bg-white/70 shadow-medium py-1'}
        `}>

            <a href="#home" className="focus:outline-none focus:ring-2 focus:ring-brandOrange-500 rounded-sm">
                <img className="w-32 md:w-40 cursor-pointer transition-transform " src={logo} alt="FuelFit" />
            </a>

            <nav className="hidden md:flex items-center justify-center gap-2">
                {['Home', 'About', 'Feature', 'Contact'].map((item) => {
                    const id = item.toLowerCase();
                    return (
                        <a
                            key={item}
                            href={`#${id}`}
                            className="relative font-body text-sm font-semibold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen-500 rounded-lg"
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <span 
                                className="relative z-10 transition-colors duration-300" 
                                style={{ color: hoveredItem === item ? '#2A832A' : '#4A5568' }}
                            >
                                {item === 'Feature' ? 'Features' : item}
                            </span>
                            {hoveredItem === item && (
                                <motion.span
                                    layoutId="nav-hover-pill"
                                    className="absolute inset-0 bg-brandGreen-500/10 border border-brandGreen-500/20 rounded-lg z-0"
                                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                                />
                            )}
                        </a>
                    );
                })}
            </nav>

            <div className='flex items-center gap-3'>
                <Button
                    onClick={() => setlogin(true)}
                    variant="primary"
                    className="py-1.5 px-4 text-xs md:text-sm md:py-2.5 md:px-6 shadow-soft hover:shadow-medium transition-all"
                >
                    Login
                </Button>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-text-primary p-2 focus:outline-none focus:ring-2 focus:ring-brandOrange-500 rounded-md flex items-center justify-center"
                    >
                        {isOpen ? <RxCross2 size={24} /> : <IoMenu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-full bg-white  border-surface-border shadow-strong flex flex-col items-center p-8 gap-6 z-40 rounded-b-3xl"
                    >
                        {['Home', 'About', 'Feature', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                className="text-text-primary font-display text-h3 hover:text-brandOrange-500 transition-colors"
                            >
                                {item === 'Feature' ? 'Features' : item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
