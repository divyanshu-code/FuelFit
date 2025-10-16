import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from "react-router-dom";

const About = () => {
  return (


    <section id="about" className="bg-gradient-to-b from-green-100 to-white  text-gray-800 py-20 px-6 md:px-16">
      <div className="max-w-7xl h-[60vh] mx-auto flex flex-col md:flex-row items-center gap-12 mt-15">

        <div className="rounded-lg md:w-[50vw]  bg-green-50 shadow-lg">
          <DotLottieReact
            src="https://lottie.host/7a56ba41-4a21-41c2-95ef-fd57ae77a7e1/9PrabbIwls.json"
            loop
            autoplay
          />
        </div>

        <div className="md:w-1/2 lg:space-y-3">
          <h2 className="lg:text-3xl text-2xl mb-2 font-mono font-bold text-green-600">About FuelFit</h2>

          <p className="text-lg text-gray-600 leading-7 italic "> 
            At <span className="font-semibold text-green-600">FuelFit</span>, we believe that fitness starts with smart eating.
            With so many food choices available today, it can be confusing to know what’s right for your body.
          </p>
          <p className="text-gray-700  lg:leading-relaxed mt-5 lg:mt-0 leading-6 mb-8">
            Our mission is to guide people who want to get fit — helping them understand
            <span className="font-bold text-green-600"> what to eat, how much to eat, and when to eat</span>,
            depending on their fitness goals. Whether your aim is to lose weight, gain muscle,
            or simply stay healthy, FuelFit creates a personalized plan for you.
          </p>

          <a href="#feature" className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300">
            Explore Features
          </a>
        </div>
      </div>
    </section>

  );
};

export default About;
