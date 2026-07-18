import React, { useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
import { LuUserRoundPen, LuEye, LuEyeOff } from "react-icons/lu";
import { TbLockPassword } from "react-icons/tb";
import { LuMail } from "react-icons/lu";
import { storedata } from '../../Context/DataContext';
import axios from 'axios';
import { toast, Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/UI/Button';
import Input from '../Components/UI/Input';
import Card from '../Components/UI/Card';

const LoginUser = ({ setlogin }) => {

    const { url, settoken } = useContext(storedata)
    const navigate = useNavigate();

    const [state, setState] = useState('Login');
    const [loader, setloader] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const changehandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setdata((data) => ({ ...data, [name]: value }));

        // Real-time validation feedback
        if (name === 'password' && value.length > 0 && value.length < 6) {
            setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
        } else if (name === 'password') {
            setErrors(prev => ({ ...prev, password: null }));
        }

        if (name === 'email' && value.length > 0 && !/^\S+@\S+\.\S+$/.test(value)) {
            setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
        } else if (name === 'email') {
            setErrors(prev => ({ ...prev, email: null }));
        }
    }

    const submithandler = async (e) => {
        e.preventDefault();

        if (errors.password || errors.email) {
            toast.error("Please fix the validation errors before submitting", { theme: "colored" });
            return;
        }

        setloader(true);
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

                    setloader(false);
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
                    localStorage.setItem("hasFitnessDetails", response.data.user.hasFitnessDetails);
                    setlogin(false)

                    setloader(false);
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
            setloader(false);
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-text-primary/40 p-4 z-[100] backdrop-blur-md transition-opacity duration-300'>
            <div className="w-full max-w-md animate-[scale-in_0.2s_ease-out]">


                <Card className="p-8 bg-white shadow-xl border border-surface-border relative">
                    <button type="button" onClick={() => setlogin(false)} className='absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer'>
                        <RxCross2 size={24} />
                    </button>

                    <form onSubmit={submithandler} className='flex flex-col gap-6 mt-2'>
                        <div className='mb-2 text-center'>
                            <h2 className='font-display text-h3 font-bold text-text-primary'>{state === 'Login' ? 'Welcome Back' : 'Create Account'}</h2>
                            <p className='text-sm text-text-secondary font-body mt-2'>
                                {state === 'Login' ? 'Enter your details to access your dashboard.' : 'Start your fitness journey today.'}
                            </p>
                        </div>

                        <div className='flex flex-col gap-4'>
                            {state === 'Sign Up' && (
                                <div className="relative">
                                    <LuUserRoundPen className='absolute left-3 top-[13px] text-text-secondary' />
                                    <Input onChange={changehandler} name='name' value={data.name} type='text' placeholder='Your name' required className="pl-10" />
                                </div>
                            )}

                            <div>
                                <div className="relative">
                                    <LuMail className={`absolute left-3 top-[13px] ${errors.email ? 'text-status-danger' : 'text-text-secondary'}`} />
                                    <Input
                                        onChange={changehandler}
                                        name='email'
                                        value={data.email}
                                        type='email'
                                        placeholder='Email address'
                                        required
                                        className={`pl-10 ${errors.email ? 'border-status-danger focus:ring-status-danger text-status-danger' : ''}`}
                                    />
                                </div>
                                {errors.email && <p className="text-status-danger text-xs mt-1 text-left font-body">{errors.email}</p>}
                            </div>

                            <div>
                                <div className="relative">
                                    <TbLockPassword size={20} className={`absolute left-3 top-[11px] ${errors.password ? 'text-status-danger' : 'text-text-secondary'}`} />
                                    <Input
                                        onChange={changehandler}
                                        name='password'
                                        value={data.password}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Password'
                                        required
                                        className={`pl-10 pr-10 ${errors.password ? 'border-status-danger focus:ring-status-danger text-status-danger' : ''}`}
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-[11px] text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer transition-colors"
                                    >
                                        {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-status-danger text-xs mt-1 text-left font-body">{errors.password}</p>}
                            </div>
                        </div>

                        <Button type='submit' variant="primary" className='w-full mt-2' disabled={loader}>
                            {loader ? (
                                <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : state === 'Sign Up' ? 'Create Account' : 'Login'}
                        </Button>

                        <div className='flex items-start gap-3 text-xs text-text-secondary mt-2'>
                            <input type='checkbox' required className='mt-0.5 bg-surface-alt border-surface-border rounded text-brandGreen-500 focus:ring-brandGreen-500 cursor-pointer' />
                            <p className='font-body'>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
                        </div>

                        <div className='text-center text-sm mt-2'>
                            {state === 'Login' ? (
                                <p className='text-text-secondary font-body'>
                                    New to FuelFit? <button type="button" className='text-brandGreen-500 hover:text-brandGreen-600 font-bold transition-colors cursor-pointer focus:outline-none focus:underline' onClick={() => { setState('Sign Up'); setErrors({}); }}>Create an account</button>
                                </p>
                            ) : (
                                <p className='text-text-secondary font-body'>
                                    Already have an account? <button type="button" className='text-brandGreen-500 hover:text-brandGreen-600 font-bold transition-colors cursor-pointer focus:outline-none focus:underline' onClick={() => { setState('Login'); setErrors({}); }}>Login</button>
                                </p>
                            )}
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default LoginUser