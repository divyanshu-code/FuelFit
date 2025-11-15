import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/FuelFit.png'
import { useContext } from 'react';
import { storedata } from '../../Context/DataContext'
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import { RxCross2 } from "react-icons/rx";

const ProfileNavbar = ({ user }) => {

    const { url, settoken, token } = useContext(storedata);
    const [image, setImage] = useState(null);
    const [profileimage, setProfileImage] = useState(null);
    const [open, setOpen] = useState(false);

    const refopen = useRef(null);
    const Closeref = useRef(null);

    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const tokens = localStorage.getItem('tokens');

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const res = await axios.get(url + `/profile/userdata/${userId}`, {
                    headers: { Authorization: `bearer ${tokens}` },
                });

                if (res.data.success && res.data.user.profileImage) {
                    setProfileImage(`${url}${res.data.user.profileImage}`);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfileImage();
    }, []);

    const logout = () => {
        if (!token) {
            navigate('/');
            return;
        };

        localStorage.removeItem('tokens');
        localStorage.removeItem('userId');
        localStorage.removeItem('fitnessGoal');
        settoken("");

        navigate('/');
    }

    useGSAP(() => {

        if (refopen.current) {
            gsap.to(refopen.current, {
                height: open ? "210px" : "0px",
                duration: 0.5,
                ease: "power2.inOut",
                opacity: open ? 1 : 0,
            });
        }

        if (Closeref.current) {
            gsap.to(Closeref.current, {
                opacity: open ? 1 : 0,
                duration: 0.3,
                ease: "power1.out",
            });
        }

    }, [open]);
    return (
        <>
            <div className='fixed top-0 rounded-md px-5 py-2 mx-[15vw] my-3 z-50 border shadow-lg border-white bg-white lg:w-[70vw]  '>
                <div className='flex justify-between items-center'>
                    <a href="#home">
                        <img className="lg:w-36 w-36  cursor-pointer" src={logo} alt="FuelFit" />
                    </a>

                    <ul className="hidden md:flex gap-10 font-light text-md">
                        <li><a href="#nutrition" className=" hover:text-green-500">Nutrition</a></li>
                        <li><a href="#bmi" className="hover:text-green-500">BMI</a></li>
                        <li><a href="#blog" className="hover:text-green-500">Blog</a></li>
                        <li><a href="#help" className="hover:text-green-500">Help</a></li>
                    </ul>

                    <div  className=" relative">

                        <label htmlFor="image-upload" >
                            <img src={image ? URL.createObjectURL(image) : profileimage || "https://cdn-icons-png.freepik.com/512/4159/4159471.png"} className='w-12 h-12 rounded-full cursor-pointer object-cover' alt="error"  onClick={()=> setOpen((prev) => !prev)}/>

                        </label>

                        <div ref={refopen} className='absolute right-0 px-5 shadow-lg rounded py-5 w-52 bg-gradient-to-b from-green-200 to-green-100 overflow-hidden opacity-0 '>
                            <RxCross2 size={18} className='absolute top-3 right-3 cursor-pointer' ref={Closeref} onClick={() => { setOpen(false) }} />
                            <label htmlFor="image-upload" className='flex flex-col justify-center items-center' >
                                <img src={image ? URL.createObjectURL(image) : profileimage || "https://cdn-icons-png.freepik.com/512/4159/4159471.png"} className='w-15 h-15 rounded-full object-cover' alt="error" />
                                <p className='font-bold mt-2 mb-2'> Hi, {user.name}</p>
                            </label>

                            <div className='flex flex-col items-start  gap-3 mt-3 '>
                                <button className='flex items-center gap-3 font-light  cursor-pointer' onClick={() => { navigate(`/${user.name}`) }}>
                                    <CgProfile size={18} className='text-green-600' /> <span>Profile</span>
                                </button>
                                <button onClick={logout} className=' flex items-center gap-3 font-light cursor-pointer'>
                                    <MdLogout size={19} className='text-green-600' /> <span >Sign Out</span>
                                </button>
                            </div>

                        </div>


                    </div>

                </div>

            </div>

        </>
    )
}

export default ProfileNavbar