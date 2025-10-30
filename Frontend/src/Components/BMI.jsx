import React, { useState } from "react";
import { motion } from "framer-motion";

const BMI = () => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [bmiStatus, setBmiStatus] = useState("");
    const [message, setMessage] = useState("");

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
        }else if (weight <= 0 && height > 0) {
            setMessage("Weight must be a positive number!");
            setBmi(null);
            return;
        }else if (height <= 0 && weight <= 0) {
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
    };

    return (
        <section id="bmi" className="py-16 h-[99vh]  mt-50 flex flex-col items-center justify-center text-center">
            <motion.h2
                className="text-2xl font-bold mb-2 text-gray-800  "
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Calculate Your BMI
            </motion.h2>

            <p className="text-gray-600 mb-15 text-left ml-20 leading-relaxed italic">
                BMI stands for <span className="font-bold">Body Mass Index</span>, a measure of body fat based on height and weight.
                <ul className="list-disc list-inside">
                    <li>Being overweight increases the risk of diseases like heart disease, diabetes, hypertension, and stroke.</li>
                    <li>Being underweight can lead to nutritional deficiencies, weak immunity, and fatigue.</li>
                </ul>
            </p>

            <motion.div
                className="bg-white p-8 rounded shadow-lg max-w-md w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col gap-4 mb-6">
                    <input
                        type="number"
                        required
                        placeholder="Enter your weight (kg)"
                        className="border rounded px-3 mt-3 py-2 w-full outline-none"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <input
                        type="number"
                        required
                        placeholder="Enter your height (cm)"
                        className="border rounded px-3 py-2 w-full outline-none"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <button
                        onClick={calculateBMI}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 rounded transition-all cursor-pointer"
                    >
                        Calculate BMI
                    </button>
                </div>

                {message && (
                    <p className="mt-4 text-center text-lg font-medium text-gray-700">{message}</p>
                )}
                {bmi && (
                    <motion.div
                        className="mt-4 p-3 rounded bg-emerald-50 border border-emerald-300"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <p className="text-xl font-semibold text-emerald-700">
                            Your BMI: {bmi}
                        </p>
                        <p className="text-md text-gray-600">Status: {bmiStatus}</p>
                    </motion.div>
                )}
            </motion.div>


        </section>
    );
};

export default BMI;
