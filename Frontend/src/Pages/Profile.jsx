import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { storedata } from '../../Context/DataContext';
import { toast, Zoom } from 'react-toastify';
import ProfileNavbar from '../Components/ProfileNavbar';
import ProfileBanner from '../Components/ProfileBanner';
import Nutrition from '../Components/Nutrition';
import BMI from '../Components/BMI';

const Profile = () => {
  const { url } = useContext(storedata);
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
        toast.error('Failed to load profile', {
          transition: Zoom,
        });
      }
    };

    fetchUser();
  }, [url]);

  if (!User) {
    return null;
  }

  const heightInMeters = User.height / 100;
  const bmi = (User.weight / (heightInMeters * heightInMeters)).toFixed(1);

  const bmiStatus =
    bmi < 18.5 ? 'Underweight' :
      bmi < 25 ? 'Normal' :
        bmi < 30 ? 'Overweight' : 'Obese';

  return (
    <>

        <div className="bg-gradient-to-b from-green-200 to-green-50 min-h-screen ">

          <ProfileNavbar user={User}/>

          <ProfileBanner user={User} bmi={bmi} bmiStatus={bmiStatus} />


          <Nutrition/>

          <BMI/>
        </div>

    </>
  );
};

export default Profile;
