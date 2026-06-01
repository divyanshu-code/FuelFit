import React, { useEffect, useRef, useState, useContext } from 'react'
import logo from '../assets/Fuelfit.png'
import { storedata } from '../../Context/DataContext'
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import { RxCross2 } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";

const ProfileNavbar = ({ user }) => {
    const { url, settoken, token } = useContext(storedata);
    const [image, setImage] = useState(null);
    const [profileimage, setProfileImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const drawerRef = useRef(null);
    const overlayRef = useRef(null);

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
    }, [url, userId, tokens]);

    const logout = () => {
        if (!token) {
            navigate('/');
            return;
        }

        localStorage.removeItem('tokens');
        localStorage.removeItem('userId');
        localStorage.removeItem('fitnessGoal');
        settoken && settoken("");
        navigate('/');
    }


    useGSAP(() => {
        if (drawerRef.current) {
            gsap.to(drawerRef.current, {
                x: drawerOpen ? '0%' : '100%',
                duration: 0.45,
                ease: 'power2.out',
            });
        }

        if (overlayRef.current) {
            gsap.to(overlayRef.current, {
                autoAlpha: drawerOpen ? 1 : 0,
                duration: 0.35,
                ease: 'power1.out',
                pointerEvents: drawerOpen ? 'auto' : 'none',
            });
        }
    }, [drawerOpen]);

    return (
        <>

            <div className='fixed top-0  left-0 right-0 z-50 lg:py-3 lg:px-[10vw]'>
                <div className='bg-white h-20 lg:h-18 lg:rounded-md border shadow-lg border-white flex items-center  justify-between px-4 py-2'>

                    <a href="#home" className='flex items-center gap-3'>
                        <img className="w-28 md:w-36 cursor-pointer" src={logo} alt="FuelFit" />
                    </a>

                    <nav className='hidden md:flex items-center gap-8 font-light'>
                        <a href="#nutrition" className='hover:text-green-600'>Nutrition</a>
                        <a href="#bmi" className='hover:text-green-600'>BMI</a>
                        <a href="#blog" className='hover:text-green-600'>Blog</a>
                        <a href="#help" className='hover:text-green-600'>Help</a>
                    </nav>

                    <div className='flex items-center gap-4'>

                        <div className='relative hidden md:block'>
                            <img
                                src={image ? URL.createObjectURL(image) : profileimage || 'https://cdn-icons-png.freepik.com/512/4159/4159471.png'}
                                alt='profile'
                                className='w-12 h-12 rounded-full object-cover cursor-pointer'
                                onClick={() => setOpen(prev => !prev)}
                            />

                            <div className={`absolute right-0 mt-2 w-48 h-52 bg-gradient-to-b from-green-200 to-green-100 rounded shadow-lg overflow-hidden transform transition-all ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                <RxCross2 size={20} className=' absolute cursor-pointer top-2 right-3' onClick={() => setOpen(false)} />
                                <div className='p-4 flex flex-col items-center'>
                                    <img src={image ? URL.createObjectURL(image) : profileimage || 'https://cdn-icons-png.freepik.com/512/4159/4159471.png'} alt='small' className='w-15 h-15 rounded-full object-cover mb-2' />
                                    <p className='font-semibold'>Hi, {user?.name}</p>
                                </div>
                                <div className='px-4 py-2 flex flex-col gap-2'>
                                    <button className='flex items-center gap-2 font-light hover:text-green-600 cursor-pointer' onClick={() => navigate(`/${user?.name}`)}><CgProfile /> Profile</button>
                                    <button className='flex items-center gap-2 font-light hover:text-green-600 cursor-pointer' onClick={logout}><MdLogout className='font-light ' /> Sign out</button>
                                </div>
                            </div>
                        </div>


                        <button className='md:hidden p-2 rounded-md' onClick={() => setDrawerOpen(true)} aria-label='Open menu'>
                            <IoMenu size={26} />
                        </button>

                    </div>
                </div>
            </div>

            <div ref={overlayRef} className='fixed inset-0 bg-black/50 z-40 opacity-0 pointer-events-none' onClick={() => setDrawerOpen(false)} />

            <aside ref={drawerRef} className='fixed top-0 right-0 h-full w-60 sm:w-3/4 md:w-1/2 lg:w-1/3 bg-gradient-to-b from-green-100 to-white z-50 transform translate-x-full'>
                <div className='p-4 flex items-center justify-between border-b border-gray-400'>
                    <a href='#home' className='flex items-center gap-3'>
                        <img className='w-28' src={logo} onClick={() => setDrawerOpen(false)} alt='logo' />
                    </a>
                    <button onClick={() => setDrawerOpen(false)} aria-label='Close' className='p-2'>
                        <RxCross2 size={26} />
                    </button>
                </div>

                <div className='py-5 px-4 overflow-y-auto h-[calc(100%-64px)]'>

                    <nav className='flex flex-col mb-6 gap-3'>
                        <a href='#nutrition' className=' px-4 rounded font-semibold hover:bg-gray-100' onClick={() => setDrawerOpen(false)}>Nutrition</a>
                        <a href='#bmi' className=' px-4 rounded font-semibold hover:bg-gray-100' onClick={() => setDrawerOpen(false)}>BMI</a>
                        <a href='#blog' className=' px-4 rounded font-semibold hover:bg-gray-100' onClick={() => setDrawerOpen(false)}>Blog</a>
                        <a href='#help' className=' px-4 rounded font-semibold hover:bg-gray-100' onClick={() => setDrawerOpen(false)}>Help</a>
                        <a className=' px-4 font-semibold hover:text-green-600 cursor-pointer' onClick={() => navigate(`/${user?.name}`)}> Profile</a>
                        <a className=' px-4 font-semibold hover:text-green-600 cursor-pointer' onClick={logout}> Sign out</a>

                    </nav>


                    <div className=''>
                        <div className='fixed bottom-5 right-3  '>
                            <label className='cursor-pointer'>
                                <img src={image ? URL.createObjectURL(image) : profileimage || 'https://cdn-icons-png.freepik.com/512/4159/4159471.png'} alt='profile' className='w-13 h-13 rounded-full object-cover' />
                            </label>
                        </div>
                    </div>
                    <div className='mt-[18rem] text-sm text-gray-500'>
                        <p>Plan it  with  FuelFit ! 🔥 </p>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default ProfileNavbar;
