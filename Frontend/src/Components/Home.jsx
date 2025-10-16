import React from "react";
import About from "./About";
import Features from "./Feature";
import Contact from "./Contact";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Navbar from "./Navbar";

const Home = ({ setlogin }) => {
  return (
    <>
     
      <Navbar setlogin={setlogin} />
      <div className="flex flex-col lg:flex-row items-center justify-center bg-gradient-to-b from-white to-green-100 min-h-screen">

        <div className="order-1 lg:order-2 flex justify-center mt-20 lg:w-[60vw] lg:mt-0">
          <DotLottieReact
            src="https://lottie.host/272346fa-e60a-4bce-838d-4b3f31d97d46/1lK88PdoeV.lottie"
            loop
            autoplay
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
            }}
          />
        </div>

        <section
          id="home"
          className="order-2 lg:order-1 flex flex-col lg:text-left px-6 lg:ml-15 lg:px-12 mt-10 lg:mt-0 scroll-mt-96"
        >
          <h1 className="text-[6vw]  lg:text-3xl font-bold text-gray-800 mb-2 lg:mb-3">
            Plan <span className="text-orange-600 italic">Smart</span>. Eat{" "}
            <span className="text-green-600 italic">Right</span>. Stay{" "}
            <span className="text-orange-500 italic">Fit</span>.
          </h1>

          <p className="text-gray-600 font-base font-medium max-w-2xl italic mx-auto lg:mx-0">
            FuelFit helps you create personalized meal plans based on your
            fitness goals and lifestyle — designed for both beginners and
            fitness enthusiasts.
          </p>

          <div className="flex gap-5 justify-start mt-6">
            <button
              onClick={() => setlogin(true)}
              className="px-6 py-2 bg-green-500 text-white shadow-lg rounded-full cursor-pointer hover:bg-green-600 transition-all duration-300"
            >
              Get Started
            </button>
            <a
              href="#about"
              className="border-2 border-gray-700 text-black shadow-lg font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-green-600 cursor-pointer hover:border-white transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </section>
      </div>

  
      <About />
      <Features />
      <Contact setlogin={setlogin} />
    </>
  );
};

export default Home;
