import React from 'react'
import logo from '../assets/Fuelfit.png'
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Navbar = ({ setlogin }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="fixed top-0 lg:w-[99vw] w-86 flex  justify-between items-center p-5 m-2 rounded-sm lg:shadow-md shadow-xl bg-white z-10">

            <a href="#home">
            <img className="lg:w-40 w-36 lg:ml-15  cursor-pointer" src={logo} alt="FuelFit" />
            </a>

            <nav className="hidden md:flex  items-center justify-center gap-10">
                <a href="#home" className="text-gray-700 hover:text-blue-700 font-medium">Home</a>
                <a href="#about" className="text-gray-700 hover:text-blue-700 font-medium">About</a>
                <a href="#feature" className="text-gray-700 hover:text-blue-700 font-medium">Features</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-700 font-medium">Contact</a>
              
            </nav>
                <div className='hidden md:flex'>

                <button onClick={() => setlogin(true)} className="border border-blue-500 bg-blue-600 text-white lg:mr-15  px-8 py-2 rounded hover:bg-black cursor-pointer hover:border-black transition">Login</button>
                </div>

            <div className="md:hidden">
                {isOpen ? (
                    <RxCross2 size={30} onClick={() => setIsOpen(false)} className="text-gray-700" />
                ) : (
                    <IoMenu size={30} onClick={() => setIsOpen(true)} className="text-gray-700" />
                )}
            </div>


            {isOpen && (
                <div className="fixed top-27 left-0  w-full h-screen bg-black/80 text-white flex flex-col items-center p-20 gap-6 z-40">
                    <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
                    <a href="#about" onClick={() => setIsOpen(false)}>About</a>
                    <a href="#feature" onClick={() => setIsOpen(false)}>Features</a>
                    <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
                    <button  onClick={() => {setlogin(true); setIsOpen(false);}} className="border border-white  px-4 py-2 rounded-lg">Login</button>

                </div>
            )}
        </div>
    );
};

export default Navbar;
