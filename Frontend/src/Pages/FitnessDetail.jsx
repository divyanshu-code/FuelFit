import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { storedata } from '../../Context/DataContext';
import axios from 'axios';
import { toast, Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import Loader from './Loader';

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
        userId: userId
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
            < div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 animate-gradient-x">

                <div className="absolute inset-0 bg-black/20"></div>
                <motion.form onSubmit={handleSubmit} className="relative z-10 bg-gradient-to-b m-5 from-white to-green-100 shadow-2xl rounded px-6 py-6 lg:w-96 w-full max-w-sm sm:max-w-md md:max-w-lg"
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -200 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <RxCross2 className="absolute top-4 right-4 cursor-pointer" size={20} onClick={() => { logout() }} />
                    <h2 className="text-xl bg-gradient-to-r from-green-700 to-green-500   bg-clip-text text-transparent  font-bold mb-3 italic text-center ">Your Fitness Details</h2>

                    <input type='text' name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border-b text-sm border-green-500 mb-5 p-1 w-full outline-none" required />
                    <div className='flex items-center gap-4'>
                        <input name="age" type='number' value={form.age} onChange={handleChange} placeholder="Age" className="border-b text-sm border-green-500 mb-5 p-1 lg:w-40 w-32 outline-none" required />
                        <select name="mealtype" value={form.mealtype} onChange={handleChange} className="border-b cursor-pointer text-sm border-green-500 mb-5 p-1 lg:w-40 w-32 outline-none" required>
                            <option value="">Meal Type</option>
                            <option value="Veg">Veg</option>
                            <option value="Non-veg">Non-Veg</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-4'>
                        <input name="height" type='number' value={form.height} onChange={handleChange} placeholder="Height (cm)" className="border-b text-sm border-green-500 mb-5 lg:w-40 w-32 p-1 outline-none" required />
                        <input name="weight" type='number' value={form.weight} onChange={handleChange} placeholder="Weight (kg)" className="border-b text-sm border-green-500 mb-5 lg:w-40 w-32 p-1 outline-none" required />

                    </div>

                    <div className='flex items-center gap-4'>

                        <select name="fitnessGoal" value={form.goal} onChange={handleChange} className="border-b cursor-pointer text-sm border-green-500 mb-8 p-1 lg:w-40 w-32 outline-none" required>
                            <option value="">Select Goal</option>
                            <option value="Stay Fit">Stay Fit</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                            <option value="Fat Loss">Fat Loss</option>
                            <option value="Weight Gain">Weight Gain</option>
                        </select>

                        <select name="gender" value={form.gender} onChange={handleChange} className="border-b cursor-pointer text-sm border-green-500 mb-8 p-1 lg:w-40 w-32 outline-none" required>
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                    </div>


                    <button type="submit" className="bg-green-500 w-full cursor-pointer hover:bg-green-600 text-white font-semibold p-2 rounded ">Continue</button>
                </motion.form>
            </div>

        </>
    )
}

export default FitnessDetail