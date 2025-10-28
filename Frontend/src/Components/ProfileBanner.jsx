import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ProfileBanner = ({ user, bmi, bmiStatus }) => {
    return (
        <>
            <section className=" h-[80vh] flex w-full overflow-hidden p-5 ">

                <motion.div
                    className=" z-10 flex flex-col  mt-20 justify-center h-full  text-black  lg:px-60"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-2xl  font-semibold italic mb-1">Welcome,  {user.name} <span className="wave">👋 </span></h1>
                    <p className="text-md mb-6 leading-relaxed ">
                        Your fitness story — progress, persistence, and performance in one place.
                    </p>

                    <div className="bg-white  backdrop-blur-lg rounded-lg w-80 px-6 py-4 flex flex-col gap-5  text-center shadow-lg">
                        <p>🧍‍♂️Weight: <span className="font-semibold">{user.weight} kg</span></p>
                        <p>📏Height: <span className="font-semibold">{user.height} cm</span></p>
                        <p>⚖️ BMI: <span className="font-semibold">{bmi}</span> ({bmiStatus})</p>

                    </div>

                    <div className="mt-6 flex gap-4">

                        <button className="bg-blue-500 border border-white px-5 py-2 rounded-full font-medium hover:bg-blue-600 cursor-pointer text-white transition">
                            View Progress
                        </button>
                    </div>
                </motion.div>

                <DotLottieReact
                    className=" lg:mr-40 lg:mt-35 h-96 "
                    src="https://lottie.host/3252aa77-c117-4f90-93be-ba180db85f2e/2SYB9k2Ghl.json"
                    loop
                    autoplay
                />
            </section>

            <div className="w-full lg:px-50 mt-5  ">
                <div className="overflow-hidden bg-emerald-200 py-5 rounded-lg shadow-xl">
                    <p className="scroll-text  p-2 text-lg rounded text-black  font-semibold">
                        <pre> 1% better every day.       keep pushing your limits!      stay consistent and complete your goals.</pre>
                    </p>

                </div>

            </div>
        </>

    );
};

export default ProfileBanner;