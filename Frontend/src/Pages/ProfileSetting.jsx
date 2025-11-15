import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { storedata } from '../../Context/DataContext';
import { FaPen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ProfileSetting = () => {

  const [image, setImage] = useState(null);
  const [profileimage, setProfileImage] = useState(null);
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

  const navigate = useNavigate()

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
            setProfileImage(`${url}${user.profileImage}`);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfileImage();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
         toast.success("Profile photo updated!");
      }
    } catch (error) {
      console.error("Upload failed", error);
        toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        url + `/profile/profileupdate/${userId}`,
        formData,
        {
          headers: { Authorization: `bearer ${tokens}` },
        }
      );

      if (res.data.success) {
         toast.success("Profile updated successfully!");

         setTimeout(() => navigate("/profile"), 1200);       // Redirect to profile 
      }
    } catch (error) {
      console.error(error);
        toast.error("Failed to update profile");
    }
  };


  return (
    <div className="bg-[#1E1F22] text-white  p-6  rounded-xl   w-[70vw] mx-auto ">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>

      <div className='flex items-start justify-between gap-30'>
        <div className="flex items-center gap-3 mb-4 mt-2">

          <label htmlFor="image-upload" className='teacher'>

            <img src={image ? URL.createObjectURL(image) : profileimage || "https://cdn-icons-png.freepik.com/512/4159/4159471.png"} className='w-20 h-20 rounded-full cursor-pointer object-cover border-2  border-gray-700 ' alt="profile" />

            <FaPen size={20} className='student text-white cursor-pointer' />
          </label>
          <input type="file" id="image-upload" className="hidden" onChange={handleImageUpload} />

          <div className='flex flex-col text-sm'>
            <p className='font-semibold'>Profile Photo</p>
            <p className='text-xs text-gray-400'> PNG, JPG or JPEG (Max. 1MB)</p>
          </div>

        </div>

        <div>
          <form className="space-y-4 w-[30vw] " onSubmit={handleSubmit}>
            <div>
              <label className=" font-semibold text-sm ">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 bg-zinc-600 outline-none  rounded-lg px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-sm">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full mt-1 bg-zinc-600 outline-none  rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Fitness Goal</label>
                <select
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  className="w-full mt-1 bg-zinc-600 outline-none  rounded-lg px-3 py-2"
                >
                  <option value="">Select</option>
                  <option value="Stay Fit">Stay Fit</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Fat Loss">Fat Loss</option>
                  <option value="Weight Gain">Weight Gain</option>
                </select>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-sm">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full mt-1 bg-zinc-600 outline-none  rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="font-semibold text-sm" >Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full mt-1 bg-zinc-600 outline-none  rounded-lg px-3 py-2"
                />
              </div>

            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold cursor-pointer  mt-5 hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetting