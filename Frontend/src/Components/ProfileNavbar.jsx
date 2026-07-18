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
import { motion, AnimatePresence } from 'framer-motion';

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
                    const imgUrl = res.data.user.profileImage;
                    if (imgUrl.startsWith('http')) {
                        setProfileImage(imgUrl);
                    } else {
                        setProfileImage(`${url}${imgUrl}`);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfileImage();
    }, [url, userId, tokens]);

    const logout = () => {
        localStorage.removeItem('tokens');
        localStorage.removeItem('userId');
        localStorage.removeItem('fitnessGoal');
        if (settoken) settoken("");
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

            <div className='fixed transition-all duration-300 z-50 flex justify-between items-center left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:-translate-x-1/2 lg:w-[1000px] rounded-2xl md:rounded-full border border-white/40 backdrop-blur-md px-6 md:px-8 top-4 bg-white/70 shadow-medium py-2 lg:py-1'>

                <a href="#home" className='flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brandGreen-500 rounded-sm'>
                    <img className="w-28 md:w-36 cursor-pointer hover:opacity-80 transition-opacity" src={logo} alt="FuelFit" />
                </a>

                <nav className='hidden md:flex items-center gap-8 font-body font-medium text-sm'>
                    <a href="#nutrition" className='text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500 rounded-sm px-2 py-1'>Nutrition</a>
                    <a href="#bmi" className='text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500 rounded-sm px-2 py-1'>BMI</a>
                    <a href="#blog" className='text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500 rounded-sm px-2 py-1'>Blog</a>
                    <a href="#help" className='text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500 rounded-sm px-2 py-1'>Help</a>
                </nav>

                <div className='flex items-center gap-4'>

                    <div className='relative hidden md:block'>
                        <button
                            className="focus:outline-none focus:ring-2 focus:ring-accent rounded-full border-2 border-transparent hover:border-accent transition-colors"
                            onClick={() => setOpen(prev => !prev)}
                        >
                            <img
                                src={image ? URL.createObjectURL(image) : profileimage || 'https://cdn-icons-png.freepik.com/512/4159/4159471.png'}
                                alt='profile'
                                className='w-11 h-11 rounded-full object-cover cursor-pointer'
                                onError={(e) => { e.target.src = 'https://cdn-icons-png.freepik.com/512/4159/4159471.png'; }}
                            />
                        </button>

                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-3 w-56 bg-white border border-surface-border rounded-xl shadow-lg overflow-hidden z-50"
                                >
                                    <RxCross2 size={20} className='absolute cursor-pointer top-3 right-3 text-text-secondary hover:text-text-primary' onClick={() => setOpen(false)} />
                                    <div className='p-5 border-b border-surface-border flex flex-col items-center'>
                                        <img src={image ? URL.createObjectURL(image) : profileimage || 'https://cdn-icons-png.freepik.com/512/4159/4159471.png'} alt='small' className='w-16 h-16 rounded-full object-cover mb-3 border border-surface-border shadow-sm' onError={(e) => { e.target.src = 'https://cdn-icons-png.freepik.com/512/4159/4159471.png'; }} />
                                        <p className='font-display font-bold text-text-primary'>Hi, {user?.name}</p>
                                    </div>
                                    <div className='p-2 flex flex-col gap-1'>
                                        <button className='w-full flex items-center gap-3 px-3 py-2 rounded-md font-body text-sm text-text-secondary hover:text-text-primary hover:bg-surface-alt cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500' onClick={() => { navigate(`/${user?.name}`); setOpen(false); }}><CgProfile size={18} /> Profile</button>
                                        <button className='w-full flex items-center gap-3 px-3 py-2 rounded-md font-body text-sm text-status-danger hover:text-status-danger hover:bg-status-danger/10 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-status-danger' onClick={logout}><MdLogout size={18} /> Sign out</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>


                    <button className='md:hidden p-2 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-brandGreen-500' onClick={() => setDrawerOpen(!drawerOpen)} aria-label='Toggle menu'>
                        {drawerOpen ? <RxCross2 size={28} /> : <IoMenu size={28} />}
                    </button>

                </div>
            </div>

            <div ref={overlayRef} className='fixed inset-0 bg-text-primary/20 z-40 opacity-0 pointer-events-none backdrop-blur-sm' onClick={() => setDrawerOpen(false)} />

            <aside ref={drawerRef} className='fixed top-0 right-0 h-full w-64 sm:w-80 bg-white border-l border-surface-border z-50 transform translate-x-full shadow-lg flex flex-col'>
                <div className='p-4 flex items-center justify-between border-b border-surface-border'>
                    <a href='#home' className='flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brandGreen-500 rounded-sm'>
                        <img className='w-28' src={logo} onClick={() => setDrawerOpen(false)} alt='logo' />
                    </a>
                    <button onClick={() => setDrawerOpen(false)} aria-label='Close' className='p-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500 rounded-md'>
                        <RxCross2 size={26} />
                    </button>
                </div>

                <div className='py-6 px-4 flex-1 overflow-y-auto flex flex-col'>
                    <nav className='flex flex-col gap-2 font-body text-base font-medium'>
                        <a href='#nutrition' className='px-4 py-3 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500' onClick={() => setDrawerOpen(false)}>Nutrition</a>
                        <a href='#bmi' className='px-4 py-3 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500' onClick={() => setDrawerOpen(false)}>BMI</a>
                        <a href='#blog' className='px-4 py-3 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500' onClick={() => setDrawerOpen(false)}>Blog</a>
                        <a href='#help' className='px-4 py-3 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500' onClick={() => setDrawerOpen(false)}>Help</a>
                    </nav>

                    <div className='mt-auto flex flex-col gap-2'>
                        <button className='px-4 py-3 text-left rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors focus:outline-none focus:ring-2 focus:ring-brandGreen-500 flex items-center gap-3 font-medium' onClick={() => { navigate(`/${user?.name}`); setDrawerOpen(false); }}> <CgProfile size={20} /> Profile</button>
                        <button className='px-4 py-3 text-left rounded-md text-red-500 font-bold hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-3' onClick={logout}> <MdLogout size={20} /> Sign out</button>

                        <div className='mt-4 pt-6 border-t border-surface-border flex items-center gap-4'>
                            <img src={image ? URL.createObjectURL(image) : profileimage || 'https://cdn-icons-png.freepik.com/512/4159/4159471.png'} alt='profile' className='w-12 h-12 rounded-full object-cover border border-surface-border' onError={(e) => { e.target.src = 'https://cdn-icons-png.freepik.com/512/4159/4159471.png'; }} />
                            <div>
                                <p className="text-text-primary font-display font-bold text-sm">Hi, {user?.name}</p>
                                <p className="text-text-secondary text-xs font-body mt-1">Plan it with FuelFit! 🔥</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default ProfileNavbar;
