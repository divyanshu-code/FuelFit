import React, { useEffect, useState } from 'react'
import logo from '../assets/FuelFit.png'
import { useContext } from 'react';
import { storedata } from '../../Context/DataContext'
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ProfileNavbar = ({ user }) => {

    const { url , settoken , token } = useContext(storedata);
    const [image, setImage] = useState(null);
    const [profileimage, setProfileImage] = useState(null);

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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setImage(file);

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const res = await axios.post(url + `/profile/upload/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `bearer ${tokens}`,
                },
            });
            if (res.data.success) {
                setProfileImage(`${url}${res.data.imageUrl}`);
            }
        } catch (error) {
            console.error("Upload failed", error);
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

                    <div className="parrent relative">

                        <label htmlFor="image-upload" >
                            <img src={image ? URL.createObjectURL(image) : profileimage || "https://cdn-icons-png.freepik.com/512/4159/4159471.png"} className='w-11 h-11 rounded-full cursor-pointer' alt="error" />

                        </label>
                        <input type="file" id="image-upload" className="hidden" onChange={handleImageUpload} />

                        <div className='child hidden absolute right-0  w-52 bg-gradient-to-b from-green-200 to-green-100  '>

                            <label htmlFor="image-upload" className='flex flex-col justify-center items-center' >
                                <img src={image ? URL.createObjectURL(image) : profileimage || "https://cdn-icons-png.freepik.com/512/4159/4159471.png"} className='w-13 h-13 rounded-full ' alt="error" />
                                <p className='font-bold mt-2 mb-2'> Hi, {user.name}</p>
                            </label>

                             <div className='flex flex-col items-start  gap-4 '>
                                <button className='flex items-center gap-3 font-light cursor-pointer '>
                                    <CgProfile size={18} className='text-green-600' /> <span>Profile</span>
                                </button>
                                <button onClick={logout} className='flex items-center gap-3 font-light cursor-pointer'>
                                    <MdLogout size={20} className='text-green-600' /> <span>Sign Out</span>
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