import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { storedata } from '../../Context/DataContext';
import axios from 'axios';
import { toast, Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { FaUser, FaCalendarAlt, FaRulerVertical, FaWeight, FaBullseye, FaUtensils, FaVenusMars } from "react-icons/fa";
import { motion } from "framer-motion";
import Loader from './Loader';
import Input from '../Components/UI/Input';
import Button from '../Components/UI/Button';
import ParticleCanvas from '../Components/UI/ParticleCanvas';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const FitnessDetail = () => {

    const userId = localStorage.getItem("userId");

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        age: '',
        height: '',
        weight: '',
        fitnessGoal: '',
        gender: '',
        userId: userId,
        mealtype: ''
    });

    const navigate = useNavigate();

    const { url, token, settoken } = useContext(storedata);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        try {

            const response = await axios.post(url + '/user/details', form, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });

            if (response.data.success) {
                toast.success('Fitness details saved', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Zoom,
                })
            }

            setForm({
                name: '',
                age: '',
                height: '',
                weight: '',
                fitnessGoal: '',
                gender: '',
                mealtype: '',
            });

            setTimeout(() => {
                localStorage.setItem('hasFitnessDetails', 'true');
                navigate('/profile');
            }, 2000);

        } catch (error) {

            const errorMessage = error.response?.data?.message || 'Something went wrong!';
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
            });
        } finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };

    const logout = () => {
        if (!token) {
            navigate('/');
            return;
        };

        localStorage.removeItem('tokens');
        localStorage.removeItem('userId');
        settoken("");

        navigate('/');
    }
    return (
        <>
            {loading && <Loader />}
            <div className="relative flex justify-center items-center min-h-screen premium-bg-mesh overflow-hidden p-4 font-body">

                {/* Energetic Background Elements */}
                <ParticleCanvas />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-brandOrange-500/20 to-brandGreen-500/10 rounded-full filter blur-[120px] pointer-events-none z-0"></div>

                <motion.div
                    className="w-full max-w-xl z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="p-8 md:p-12 relative bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl">

                        <button type="button" onClick={logout} className="absolute top-6 right-6 text-text-secondary hover:text-brandOrange-500 transition-colors cursor-pointer focus:outline-none bg-white/50 p-2 rounded-full hover:bg-white/80">
                            <RxCross2 size={22} />
                        </button>

                        <motion.div variants={itemVariants} className="text-center mb-10">
                            <div className="inline-block lg:px-4 lg:py-1.5 px-3 py-1 rounded-full bg-brandGreen-500/10 border border-brandGreen-500/20 text-brandGreen-600 lg:text-xs text-[10px] font-bold tracking-widest uppercase mb-4">
                                Personalize Your Journey
                            </div>
                            <h2 className="lg:text-4xl text-2xl font-display font-extrabold text-text-primary mb-1 tracking-tight">Level Up Your <span className="text-brandGreen-500">Fitness</span></h2>
                            <p className="text-text-secondary lg:text-base text-md max-w-sm mx-auto">Tell us a bit about yourself so we can tailor the perfect plan for your goals.</p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            <motion.div variants={itemVariants}>
                                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block pl-1">Full Name</label>
                                <div className="relative group flex items-center">
                                    <div className="absolute left-4 z-10 text-text-secondary transition-colors group-focus-within:text-brandGreen-500">
                                        <FaUser size={16} />
                                    </div>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g. John Doe"
                                        required
                                        className="pl-12 bg-white/60 backdrop-blur-sm border-white/50 focus:bg-white/90 focus:border-brandGreen-500 transition-all duration-300 h-[50px] shadow-sm rounded-xl"
                                    />
                                </div>
                            </motion.div>

                            <div className='flex flex-col sm:flex-row gap-6'>
                                <motion.div variants={itemVariants} className="flex-1">
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block pl-1">Age</label>
                                    <div className="relative group flex items-center">
                                        <div className="absolute left-4 z-10 text-text-secondary transition-colors group-focus-within:text-brandGreen-500">
                                            <FaCalendarAlt size={16} />
                                        </div>
                                        <Input
                                            name="age"
                                            type="number"
                                            value={form.age}
                                            onChange={handleChange}
                                            placeholder="Years"
                                            required
                                            className="pl-12 bg-white/60 backdrop-blur-sm border-white/50 focus:bg-white/90 focus:border-brandGreen-500 transition-all duration-300 h-[50px] shadow-sm rounded-xl"
                                        />
                                    </div>
                                </motion.div>
                                <motion.div variants={itemVariants} className="flex-1">
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block pl-1">Meal Preference</label>
                                    <div className="relative group flex items-center">
                                        <div className="absolute left-4 z-10 text-text-secondary transition-colors group-focus-within:text-brandGreen-500 pointer-events-none">
                                            <FaUtensils size={16} />
                                        </div>
                                        <select
                                            name="mealtype"
                                            value={form.mealtype}
                                            onChange={handleChange}
                                            className="w-full h-[50px] pl-12 pr-4 bg-white/60 backdrop-blur-sm border border-white/50 focus:bg-white/90 focus:border-brandGreen-500 focus:ring-2 focus:ring-brandGreen-500/20 rounded-xl outline-none text-text-primary text-sm font-body transition-all duration-300 shadow-sm appearance-none relative cursor-pointer"
                                            required
                                        >
                                            <option value="" disabled>Select diet...</option>
                                            <option value="Veg">Vegetarian</option>
                                            <option value="Non-veg">Non-Vegetarian</option>
                                            <option value="Both">Flexitarian (Both)</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            <div className='flex flex-col sm:flex-row gap-6'>
                                <motion.div variants={itemVariants} className="flex-1">
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block pl-1">Height</label>
                                    <div className="relative group flex items-center">
                                        <div className="absolute left-4 z-10 text-text-secondary transition-colors group-focus-within:text-brandGreen-500">
                                            <FaRulerVertical size={16} />
                                        </div>
                                        <Input
                                            name="height"
                                            type="number"
                                            value={form.height}
                                            onChange={handleChange}
                                            placeholder="cm"
                                            required
                                            className="pl-12 bg-white/60 backdrop-blur-sm border-white/50 focus:bg-white/90 focus:border-brandGreen-500 transition-all duration-300 h-[50px] shadow-sm rounded-xl"
                                        />
                                    </div>
                                </motion.div>
                                <motion.div variants={itemVariants} className="flex-1">
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block pl-1">Weight</label>
                                    <div className="relative group flex items-center">
                                        <div className="absolute left-4 z-10 text-text-secondary transition-colors group-focus-within:text-brandGreen-500">
                                            <FaWeight size={16} />
                                        </div>
                                        <Input
                                            name="weight"
                                            type="number"
                                            value={form.weight}
                                            onChange={handleChange}
                                            placeholder="kg"
                                            required
                                            className="pl-12 bg-white/60 backdrop-blur-sm border-white/50 focus:bg-white/90 focus:border-brandGreen-500 transition-all duration-300 h-[50px] shadow-sm rounded-xl"
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            <div className='flex flex-col sm:flex-row gap-6 mb-4'>
                                <motion.div variants={itemVariants} className="flex-1">
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block pl-1">Primary Goal</label>
                                    <div className="relative group flex items-center">
                                        <div className="absolute left-4 z-10 text-text-secondary transition-colors group-focus-within:text-brandGreen-500 pointer-events-none">
                                            <FaBullseye size={16} />
                                        </div>
                                        <select
                                            name="fitnessGoal"
                                            value={form.fitnessGoal}
                                            onChange={handleChange}
                                            className="w-full h-[50px] pl-12 pr-4 bg-white/60 backdrop-blur-sm border border-white/50 focus:bg-white/90 focus:border-brandGreen-500 focus:ring-2 focus:ring-brandGreen-500/20 rounded-xl outline-none text-text-primary text-sm font-body transition-all duration-300 shadow-sm appearance-none relative cursor-pointer"
                                            required
                                        >
                                            <option value="" disabled>Select goal...</option>
                                            <option value="Stay Fit">Stay Fit</option>
                                            <option value="Muscle Gain">Muscle Gain</option>
                                            <option value="Fat Loss">Fat Loss</option>
                                            <option value="Weight Gain">Weight Gain</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div variants={itemVariants} className="flex-1">
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block pl-1">Gender</label>
                                    <div className="relative group flex items-center">
                                        <div className="absolute left-4 z-10 text-text-secondary transition-colors group-focus-within:text-brandGreen-500 pointer-events-none">
                                            <FaVenusMars size={16} />
                                        </div>
                                        <select
                                            name="gender"
                                            value={form.gender}
                                            onChange={handleChange}
                                            className="w-full h-[50px] pl-12 pr-4 bg-white/60 backdrop-blur-sm border border-white/50 focus:bg-white/90 focus:border-brandGreen-500 focus:ring-2 focus:ring-brandGreen-500/20 rounded-xl outline-none text-text-primary text-sm font-body transition-all duration-300 shadow-sm appearance-none relative cursor-pointer"
                                            required
                                        >
                                            <option value="" disabled>Select gender...</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div variants={itemVariants}>
                                <Button type="submit" variant="primary" className="w-full mt-2 py-4 text-lg shadow-xl shadow-brandGreen-500/30 hover:shadow-brandGreen-500/50 hover:-translate-y-1 transition-all duration-300 border border-brandGreen-400">
                                    Save Details & Continue
                                </Button>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default FitnessDetail