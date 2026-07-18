import React from "react";
import { FaEnvelope, FaPhoneAlt, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Help = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="py-24 px-6 md:px-20 mt-20 relative w-full flex justify-center" id="help">

            <motion.div
                className="w-full max-w-4xl flex flex-col items-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-5 text-center"
                >
                    Need <span className="text-brandGreen-500">Help?</span>
                </motion.h2>

                <motion.div
                    variants={itemVariants}
                    className="w-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-soft hover:shadow-medium transition-all duration-300 rounded-3xl p-8 md:p-12 text-text-secondary"
                >
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="w-16 h-16 bg-brandGreen-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <FaInfoCircle className="text-3xl text-brandGreen-500" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-text-primary mb-4">
                            Contact Support
                        </h3>
                        <p className="max-w-2xl text-base leading-relaxed">
                            Have any issues, feedback, or suggestions? We’d love to hear from you! Reach out to us directly and our team will get back to you promptly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email Card */}
                        <a href="mailto:support@smartdietfit.com" className="group flex items-center gap-5 p-6 rounded-2xl bg-white/60 border border-white/50 hover:bg-brandGreen-500/20 hover:border-brandGreen-500/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-brandGreen-500/10 flex items-center justify-center group-hover:bg-brandGreen-500/20 transition-colors">
                                <FaEnvelope className="text-xl text-brandGreen-600 transition-colors" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-xs font-bold uppercase tracking-wider text-text-muted group-hover:text-brandGreen-600 mb-1 transition-colors">Email Us</span>
                                <span className="font-semibold text-text-primary group-hover:text-brandGreen-800 transition-colors">support@smartdietfit.com</span>
                            </div>
                        </a>

                        {/* Phone Card */}
                        <a href="tel:+919876543210" className="group flex items-center gap-5 p-6 rounded-2xl bg-white/60 border border-white/50 hover:bg-brandOrange-500/20 hover:border-brandOrange-500/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-brandOrange-500/10 flex items-center justify-center group-hover:bg-brandOrange-500/20 transition-colors">
                                <FaPhoneAlt className="text-xl text-brandOrange-600 transition-colors" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-xs font-bold uppercase tracking-wider text-text-muted group-hover:text-brandOrange-600 mb-1 transition-colors">Call Us</span>
                                <span className="font-semibold text-text-primary group-hover:text-brandOrange-800 transition-colors">+91 98765 43210</span>
                            </div>
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Help;
