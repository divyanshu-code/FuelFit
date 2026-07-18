import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Card from "./UI/Card";
import Badge from "./UI/Badge";

const EmojiScatter = ({ emoji }) => {
    const particles = Array.from({ length: 30 }); // increased to 30 for better spread
    return (
        <div className="absolute bottom-0 left-0 right-0 h-0 pointer-events-none flex items-center justify-center z-50">
            {particles.map((_, i) => {
                // Wider cone for a bigger spread
                const minAngle = -Math.PI * 0.9;
                const maxAngle = -Math.PI * 0.1;
                const randomAngle = minAngle + Math.random() * (maxAngle - minAngle);

                // Shoot even further
                const randomRadius = 150 + Math.random() * 250;

                const x = Math.cos(randomAngle) * randomRadius;
                const y = Math.sin(randomAngle) * randomRadius;

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 1, 0], // stay visible longer
                            scale: [0, Math.random() * 1.5 + 0.5, Math.random() + 0.5, 0],
                            x: [0, x],
                            y: [0, y, y + (Math.random() * 80 + 30)], // higher pop, slower fall
                            rotate: Math.random() * 1080 - 540
                        }}
                        transition={{
                            duration: 6 + Math.random() * 2, // Extremely slow (6-8 seconds)
                            ease: "easeOut",
                            times: [0, 0.1, 0.5, 0.8, 1] // Keeps it visible and moving for 80% of the animation before fading
                        }}
                        className="absolute text-4xl"
                    >
                        {emoji}
                    </motion.div>
                );
            })}
        </div>
    );
};

const BMI = () => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [bmiStatus, setBmiStatus] = useState("");
    const [message, setMessage] = useState("");
    const [scatterKey, setScatterKey] = useState(0); // Used to re-trigger animation

    const calculateBMI = () => {
        if (!height || !weight) {
            setMessage("Height and weight cannot be empty!");
            setBmi(null);
            return;
        }

        if (height <= 0 && weight > 0) {
            setMessage("Height must be a positive number!");
            setBmi(null);
            return;
        } else if (weight <= 0 && height > 0) {
            setMessage("Weight must be a positive number!");
            setBmi(null);
            return;
        } else if (height <= 0 && weight <= 0) {
            setMessage("Height and Weight must be positive numbers!");
            setBmi(null);
            return;
        }

        const hInMeters = height / 100;
        const calculatedBmi = (weight / (hInMeters * hInMeters)).toFixed(2);
        setBmi(calculatedBmi);

        if (calculatedBmi < 18.5) setBmiStatus("Underweight");
        else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) setBmiStatus("Normal weight");
        else if (calculatedBmi >= 25 && calculatedBmi < 29.9) setBmiStatus("Overweight");
        else setBmiStatus("Obese");

        setScatterKey(prev => prev + 1); // Trigger scatter animation
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Underweight": return "text-status-warning bg-status-warning/10 border-status-warning/30";
            case "Normal weight": return "text-status-success bg-status-success/10 border-status-success/30";
            case "Overweight": return "text-brandOrange-500 bg-brandOrange-500/10 border-brandOrange-500/30";
            case "Obese": return "text-status-danger bg-status-danger/10 border-status-danger/30";
            default: return "text-text-primary bg-surface-alt border-surface-border";
        }
    };

    const getStatusEmoji = (status) => {
        switch (status) {
            case "Underweight": return "☹️";
            case "Normal weight": return "🔥";
            case "Overweight": return "😟";
            case "Obese": return "😟";
            default: return "✨";
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <section
            id="bmi"
            className="min-h-screen py-20 px-4 md:px-8 lg:px-12 flex flex-col items-center justify-center text-center bg-transparent font-body relative"
        >
            {/* Decorative Orbs */}
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-brandOrange-500/10 rounded-full filter blur-[100px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brandGreen-500/10 rounded-full filter blur-[120px] pointer-events-none -z-10"></div>

            <motion.div
                className="w-full max-w-4xl flex flex-col items-center z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
            >
                <motion.h2
                    className="text-3xl md:text-5xl font-display font-bold mb-4 text-text-primary"
                    variants={itemVariants}
                >
                    Calculate Your <span className="text-brandGreen-500">BMI</span>
                </motion.h2>

                <motion.div variants={itemVariants} className="text-text-secondary mb-10 max-w-3xl text-sm md:text-base leading-relaxed text-center">
                    BMI stands for Body Mass Index, a measure of body fat based on height and weight. Maintaining a healthy BMI is crucial for reducing the risk of heart disease, diabetes, and other health conditions.
                </motion.div>

                <motion.div
                    className="w-full max-w-md"
                    variants={itemVariants}
                >
                    <Card className="p-8 relative overflow-visible">
                        {/* Decorative accent wrapped to contain its overflow */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-brandGreen-500/10 blur-[40px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                        <div className="flex flex-col gap-5 mb-8 relative z-10">
                            <Input
                                type="number"
                                required
                                placeholder="Enter your weight (kg)"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="h-14 text-lg bg-surface-alt/50 border-white/20 shadow-inner focus:bg-white"
                            />
                            <Input
                                type="number"
                                required
                                placeholder="Enter your height (cm)"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="h-14 text-lg bg-surface-alt/50 border-white/20 shadow-inner focus:bg-white"
                            />
                            <Button
                                onClick={calculateBMI}
                                variant="primary"
                                className="h-14 text-lg mt-2 shadow-soft hover:shadow-medium"
                            >
                                Calculate BMI
                            </Button>
                        </div>

                        {message && (
                            <p className="mt-2 text-center text-sm font-bold text-status-danger">{message}</p>
                        )}

                        {bmi && (
                            <motion.div
                                className={`mt-6 p-6 rounded-2xl border backdrop-blur-sm shadow-soft relative overflow-visible ${getStatusColor(bmiStatus)}`}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                {/* Emoji Scatter Animation */}
                                <EmojiScatter key={scatterKey} emoji={getStatusEmoji(bmiStatus)} />

                                <p className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Your BMI Score</p>
                                <p className="text-5xl font-display font-extrabold mb-3">{bmi}</p>
                                <Badge variant={bmiStatus === "Normal weight" ? "success" : (bmiStatus === "Obese" ? "danger" : "warning")} className="text-sm py-1.5 px-4 shadow-sm">
                                    {bmiStatus}
                                </Badge>
                            </motion.div>
                        )}
                    </Card>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default BMI;
