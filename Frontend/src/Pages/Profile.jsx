import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { storedata } from '../../Context/DataContext';
import { toast, Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProfileNavbar from '../Components/ProfileNavbar';
import ProfileBanner from '../Components/ProfileBanner';
import Nutrition from '../Components/Nutrition';
import BMI from '../Components/BMI';
import Blog from '../Components/Blog';
import Help from '../Components/Help';
import ParticleCanvas from '../Components/UI/ParticleCanvas';

const Profile = () => {
  const { url } = useContext(storedata);
  const navigate = useNavigate();
  const [User, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('tokens');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${url}/profile/userdata/${userId}`, {
          headers: {
            Authorization: `bearer ${token}`,
          }
        });

        if (response.data.success) {
          setUser(response.data.user);
        }

      } catch (error) {
        toast.error('Session expired or user not found. Please login again.', {
          transition: Zoom,
        });
        localStorage.removeItem('tokens');
        localStorage.removeItem('userId');
        localStorage.removeItem('hasFitnessDetails');
        navigate('/');
      }
    };

    fetchUser();
  }, [url, userId, token, navigate]);

  if (!User) {
    return (
      <div className="min-h-screen font-body relative overflow-hidden bg-surface flex flex-col">
        {/* Navbar Skeleton */}
        <div className="w-full h-20 bg-white/40 backdrop-blur-md border-b border-white/20 px-6 md:px-16 flex items-center justify-between animate-pulse absolute top-0 z-50">
          <div className="w-32 h-8 bg-black/10 rounded-lg"></div>
          <div className="flex items-center gap-4">
            <div className="w-24 h-8 bg-black/10 rounded-lg hidden md:block"></div>
            <div className="w-12 h-12 bg-black/10 rounded-full"></div>
          </div>
        </div>

        {/* Profile Banner Skeleton */}
        <div className="w-full max-w-7xl mx-auto mt-32 px-4 md:px-8">
          <div className="w-full h-auto md:h-80 bg-white/30 rounded-3xl animate-pulse flex flex-col md:flex-row items-center justify-center md:justify-start p-10 gap-8 shadow-sm">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-black/10 shrink-0"></div>
            <div className="flex flex-col gap-4 w-full max-w-md items-center md:items-start">
              <div className="h-10 w-3/4 bg-black/10 rounded-xl"></div>
              <div className="h-6 w-1/2 bg-black/10 rounded-lg"></div>
              <div className="flex gap-4 mt-4 w-full justify-center md:justify-start">
                <div className="h-12 w-24 bg-black/10 rounded-2xl"></div>
                <div className="h-12 w-24 bg-black/10 rounded-2xl"></div>
                <div className="h-12 w-24 bg-black/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections Skeleton */}
        <div className="w-full max-w-7xl mx-auto mt-20 px-4 md:px-8">
          <div className="h-12 w-64 bg-black/10 rounded-xl mb-12 animate-pulse mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white/30 rounded-3xl animate-pulse shadow-sm"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const heightInMeters = User.height / 100;
  const bmi = (User.weight / (heightInMeters * heightInMeters)).toFixed(1);

  const bmiStatus =
    bmi < 18.5 ? 'Underweight' :
      bmi < 25 ? 'Normal' :
        bmi < 30 ? 'Overweight' : 'Obese';

  return (
    <>
      <div className="min-h-screen font-body relative overflow-hidden bg-surface">

        {/* Dynamic Background synced across the entire page */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticleCanvas />
        </div>

        <ProfileNavbar user={User} />

        <div className="premium-bg-mesh min-h-screen pt-10 pb-12 relative z-10 bg-transparent">
          <ProfileBanner user={User} bmi={bmi} bmiStatus={bmiStatus} />
        </div>

        <div className='mt-30 relative z-10'>
          <Nutrition />

        </div>

        <div className="relative z-10">
          <BMI />
          <Blog />
          <Help />
        </div>
      </div>

    </>
  );
};

export default Profile;
