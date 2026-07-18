import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { storedata } from '../../Context/DataContext';
import { FaPen, FaArrowLeft, FaCamera } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Input from '../Components/UI/Input';
import { motion } from 'framer-motion';

const ProfileSetting = () => {
  const [image, setImage] = useState(null);
  const [profileimage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    fitnessGoal: "",
  });

  const { url } = useContext(storedata);
  const userId = localStorage.getItem('userId');
  const tokens = localStorage.getItem('tokens');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const res = await axios.get(url + `/profile/userdata/${userId}`, {
          headers: { Authorization: `bearer ${tokens}` },
        });

        if (res.data.success) {
          const user = res.data.user;
          setFormData({
            name: user.name,
            age: user.age,
            weight: user.weight,
            height: user.height,
            fitnessGoal: user.fitnessGoal,
          });

          if (user.profileImage) {
            if (user.profileImage.startsWith('http')) {
              setProfileImage(user.profileImage);
            } else {
              setProfileImage(`${url}${user.profileImage}`);
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfileImage();
  }, [url, userId, tokens]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);

    const uploadData = new FormData();
    uploadData.append("profileImage", file);

    try {
      const res = await axios.post(url + `/profile/upload/${userId}`, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${tokens}`,
        },
      });

      if (res.data.success) {
        const imageUrl = res.data.imageUrl;
        if (imageUrl.startsWith('http')) {
          setProfileImage(imageUrl);
        } else {
          setProfileImage(`${url}${imageUrl}`);
        }
        toast.success("Profile photo updated!");
      } else {
        toast.error(res.data.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.put(url + `/profile/profileupdate/${userId}`, formData, {
        headers: { Authorization: `bearer ${tokens}` },
      });

      if (res.data.success) {
        toast.success("Profile updated successfully!");
        setTimeout(() => navigate("/profile"), 1000);
      } else {
        toast.error(res.data.message || "Failed to update profile");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen font-body relative overflow-hidden bg-slate-900 flex flex-col">
      {/* Decorative Orbs to replace mesh */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brandGreen-500/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brandOrange-500/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      {/* Top Navbar */}
      <div className="w-full h-20 bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 md:px-12 flex items-center justify-between relative z-50">
        <button onClick={() => navigate('/profile')} className="flex items-center gap-3 cursor-pointer text-white/80 hover:text-white transition-colors group focus:outline-none">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
            <FaArrowLeft />
          </div>
          <span className="font-display font-bold text-lg hidden sm:block">Back to Profile</span>
        </button>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-12 flex items-center justify-center relative z-10">

        <motion.div
          className="w-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-soft rounded-[2rem] overflow-hidden flex flex-col md:flex-row"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Left Panel: Photo Upload */}
          <div className="w-full md:w-1/3 bg-black/20 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Decorative glows */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brandGreen-500/30 blur-[60px] pointer-events-none rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brandOrange-500/30 blur-[60px] pointer-events-none rounded-full"></div>

            <motion.div variants={itemVariants} className="relative group mb-6">
              <div className="absolute inset-0 bg-gradient-to-tr from-brandGreen-500 to-brandOrange-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
              <label htmlFor="image-upload" className="relative cursor-pointer block w-40 h-40 rounded-full p-1 bg-white/20 backdrop-blur-sm shadow-xl transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                <img
                  src={image ? URL.createObjectURL(image) : profileimage || "https://cdn-icons-png.freepik.com/512/4159/4159471.png"}
                  className="w-full h-full rounded-full object-cover border-4 border-transparent"
                  alt="profile"
                />
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <FaCamera size={32} className="text-white" />
                </div>
              </label>
              <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-display font-bold text-white mb-2">Profile Photo</h2>
              <p className="text-white/60 text-sm">PNG, JPG or JPEG (Max 1MB)</p>
            </motion.div>
          </div>

          {/* Right Panel: Form Settings */}
          <div className="w-full md:w-2/3 p-8 md:p-12 relative z-10">
            <motion.h2 variants={itemVariants} className="text-3xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">
              Personal Information
            </motion.h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div variants={itemVariants}>
                <label className="font-bold text-sm text-white/70 mb-2 block uppercase tracking-wider">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20"
                  required
                />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label className="font-bold text-sm text-white/70 mb-2 block uppercase tracking-wider">Age</label>
                  <Input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="font-bold text-sm text-white/70 mb-2 block uppercase tracking-wider">Fitness Goal</label>
                  <select
                    name="fitnessGoal"
                    value={formData.fitnessGoal}
                    onChange={handleChange}
                    required
                    className="w-full h-[46px] px-4 bg-slate-800/50 border border-white/20 focus:bg-slate-800/80 focus:border-brandGreen-500 focus:ring-1 focus:ring-brandGreen-500 rounded-lg outline-none text-white text-sm font-body transition-all"
                  >
                    <option value="" disabled>Select Goal</option>
                    <option value="Stay Fit">Stay Fit</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Fat Loss">Fat Loss</option>
                    <option value="Weight Gain">Weight Gain</option>
                  </select>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label className="font-bold text-sm text-white/70 mb-2 block uppercase tracking-wider">Weight (kg)</label>
                  <Input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="font-bold text-sm text-white/70 mb-2 block uppercase tracking-wider">Height (cm)</label>
                  <Input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20"
                    required
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl border bg-gradient-to-r from-brandGreen-500 to-brandGreen-600 text-white font-bold font-display shadow-[0_4px_15px_rgba(34,197,94,0.3] cursor-pointer hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProfileSetting;
