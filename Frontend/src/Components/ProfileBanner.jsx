import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from "react-router-dom";

const ProfileBanner = ({ user, bmi, bmiStatus }) => {
    return (
        <>
            <section className="flex flex-col lg:flex-row items-center justify-center w-full p-5 lg:p-20" id="home">

                <div className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center mt-20 lg:mt-30">
                    <DotLottieReact
                        className="h-64 md:h-80 lg:h-96"
                        src="https://lottie.host/3252aa77-c117-4f90-93be-ba180db85f2e/2SYB9k2Ghl.json"
                        loop
                        autoplay
                    />
                </div>
                <motion.div
                    className=" order-2 lg:order-1 flex flex-col justify-center w-full lg:w-1/2 mt-8 lg:mt-35 text-black lg:px-40"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-2xl  font-bold italic ">Welcome, {user.name} <span className="wave">👋 </span></h1>

                    <p className="text-sm md:text-base mb-6 leading-tight">
                        Your fitness story — progress, persistence, and performance in one place.
                    </p>

                    <div className="bg-white rounded-lg w-full sm:w-80 px-6 py-4 flex flex-col gap-2 lg:text-center shadow-lg">
                        <p>🧍‍♂️Weight: <span className="font-semibold">{user.weight} kg</span></p>
                        <p>📏Height: <span className="font-semibold">{user.height} cm</span></p>
                        <p>⚖️ BMI: <span className="font-semibold">{bmi}</span> ({bmiStatus})</p>
                        <p>🍽️ Meal Type: <span className="font-semibold">{user.mealtype}</span></p>
                        <p>🏋️‍♂️ Fitness Goal: <span className="font-semibold">{user.fitnessGoal}</span></p>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <Link to="/progress" className="inline-block bg-blue-500 px-5 py-2 rounded-full font-medium hover:bg-blue-600 text-white transition">
                            View Progress
                        </Link>
                    </div>
                </motion.div>

            </section>
                <div className="w-full mt-10 lg:mt-0">
                    <div className="overflow-hidden  py-5">
                        <div className="scroll-text lg:gap-30 gap-20 p-2 text-lg rounded text-black font-semibold flex whitespace-nowrap">
                            <h1>1% better every day.</h1>
                            <h1>keep pushing your limits!</h1>
                            <h1>stay consistent and complete your goals.</h1>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default ProfileBanner;
