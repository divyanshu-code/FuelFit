import React, { useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
import { LuUserRoundPen } from "react-icons/lu";
import { TbLockPassword } from "react-icons/tb";
import { LuMail } from "react-icons/lu";
import { storedata } from '../../Context/DataContext';
import axios from 'axios';
import { toast, Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginUser = ({ setlogin }) => {

    const { url, settoken } = useContext(storedata)

    const navigate = useNavigate();

    const [state, setState] = useState('Login');

    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const changehandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setdata((data) => ({ ...data, [name]: value }));

    }

    const submithandler = async (e) => {
        e.preventDefault();

        let newurl = url;

        if (state === 'Login') {
            newurl += '/user/login'
        } else {
            newurl += '/user/register'
        }

        try {
            const response = await axios.post(newurl, data);

            if (response.data.success) {
                if (state === 'Sign Up') {
                    toast.success('Registration successful!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Zoom,
                    })

                    setState('Login')

                    setdata({
                        name: "",
                        email: "",
                        password: ""
                    })


                    return;
                } else {

                    settoken(response.data.token)
                    localStorage.setItem('tokens', response.data.token)
                    localStorage.setItem("userId", response.data.user._id);
                    setlogin(false)
                    toast.success('Login successful!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Zoom,

                    });

                    if (response.data.user.hasFitnessDetails) {
                        navigate("/profile");
                    } else {
                        navigate("/details");
                    }
                }

            }

        } catch (error) {
            console.error("Login/Register Error:", error);

            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong! Please try again.";

            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
            });
        }

    }


    return (
        <>
            <div className='fixed inset-0 flex items-center justify-center bg-black/70  p-4 bg-opacity-50 z-50' id='log'>

                <form onSubmit={submithandler} className='w-[90%] max-w-sm sm:h-[55vh] flex flex-col gap-4 bg-green-50 p-6 sm:p-8 rounded-lg shadow-2xl'>
                    <div className=' flex justify-between text-black font-bold text-2xl'>
                        <h2 className='lg:ml-32  ml-[25vw]'>{state}</h2>
                        <RxCross2 className='w-6 h-6   cursor-pointer' onClick={() => setlogin(false)} />
                    </div>
                    <div className='flex flex-col gap-4 '>
                        {state === 'Login' ? null : (
                            <div className='flex items-center border-b border-green-500 '>
                                <LuUserRoundPen className=' text-green-500' />
                                <input onChange={changehandler} name='name' value={data.name} className='ml-2  p-2 w-80 outline-none text-sm font-semibold' type='text' placeholder='Your name' required />
                            </div>
                        )}
                        <div className='flex items-center border-b border-green-500'>
                            <LuMail className=' text-green-500' />
                            <input onChange={changehandler} name='email' value={data.email} className='ml-2 p-2 w-80 outline-none text-sm font-semibold' type='email' placeholder='Your email' required />
                        </div>
                        <div className='flex items-center border-b border-green-500'>
                            <TbLockPassword size={20} className=' text-green-500' />
                            <input onChange={changehandler} name='password' value={data.password} className='ml-2 p-2 w-80 outline-none text-sm font-semibold' type='password' placeholder='Password' required />
                        </div>
                    </div>
                    <button type='submit' className='border-none font-bold hover:bg-green-600 bg-green-500 w-full rounded p-2 text-white cursor-pointer'>
                        {state === 'Sign Up' ? 'Create account' : 'Login'}
                    </button>
                    <div className='flex items-start gap-2 text-xs'>
                        <input type='checkbox' required className='mt-0.5' />
                        <p className='font-semibold'>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
                    </div>
                    <div className='text-center lg:text-sm text-xs'>
                        {state === 'Login' ? (
                            <p className='font-semibold'>
                                Create a new account? <span className='text-green-600 cursor-pointer' onClick={() => setState('Sign Up')}>Click here</span>
                            </p>
                        ) : (
                            <p className='font-semibold'>
                                Already have an account? <span className='text-green-600 cursor-pointer' onClick={() => setState('Login')}>Login here</span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginUser