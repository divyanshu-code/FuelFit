import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { storedata } from '../../Context/DataContext'; 
import { toast, Zoom } from 'react-toastify';
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdWc } from "react-icons/md";
import { MdFitnessCenter } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import { PiArmchairBold } from "react-icons/pi";

const Profile = () => {
  const { url } = useContext(storedata);
  const [User, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('tokens');

  useEffect(() => {
    const fetchUser = async () => {
      try {        
        const response = await axios.get( `${url}/profile/userdata/${userId}`, {
          headers: {
            Authorization: `bearer ${token}`,
          }
        });
        
        if (response.data.success) {
          setUser(response.data.user);
        }


      } catch (error) {
        toast.error('Failed to load profile', {
          transition: Zoom,
        });
      }
    };

    fetchUser();
  }, [url]);

  if (!User) {
    return  null;
  }

  const heightInMeters = User.height / 100;
  const bmi = (User.weight / (heightInMeters * heightInMeters)).toFixed(1);

  const bmiStatus =
    bmi < 18.5 ? 'Underweight' :
    bmi < 25 ? 'Normal' :
    bmi < 30 ? 'Overweight' : 'Obese';

  return (
     <>
      <div className=''>

      </div>
     </>
  );
};

export default Profile;
