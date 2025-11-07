import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext } from "react";
import { storedata } from "../../Context/DataContext";
import Loader from "../Pages/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [todayData, setTodayData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [progressHistory, setProgressHistory] = useState([]);
  const token = localStorage.getItem("tokens");
  const userId = localStorage.getItem("userId");

  const { url } = useContext(storedata);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url + `/dashboard/data/${userId}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      setUser(res.data.user);

      setTodayData(res.data.todayData);
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {

      setTimeout(() => setLoading(false), 2000);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  const handleMealComplete = async (mealId, nutrition) => {
    try {
      await axios.post(
        url + `/dashboard/update/${userId}`,
        { mealId, nutrition },
        { headers: { Authorization: `bearer ${token}` } }
      );
      fetchUserData();
    } catch (err) {
      console.error("Error updating meal:", err);
    }
  };


  useEffect(() => {
    if (todayData) {
      const today = new Date().toISOString().split("T")[0];
      const updatedHistory = [
        ...progressHistory.filter((d) => d.date !== today),
        {
          date: today,
          completed: todayData.completed || false,
        },
      ];

      setProgressHistory(updatedHistory);
    }
  }, [todayData]);


  const tileContent = ({ date, view }) => {

    if (view === "month") {
      const day = date.toLocaleDateString("en-CA");
      const progress = progressHistory.find((d) => d.date === day);

      if (progress) {
        return (
          <div className="flex flex-col items-center justify-center"
            style={{ lineHeight: "1", marginTop: "-15px" }}
          >

            <span
              style={{
                fontSize: "1rem",
                marginLeft: "1px",
              }}
            >
              {progress.completed ? "✅" : "😫"}
            </span>

            <div className="absolute hidden group-hover:flex flex-col items-center 
              bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-50 
              top-43 left-1/2 -translate-x-1/2 whitespace-nowrap">

              <p>{day}</p>
              <p>
                Status:{" "}
                {progress.completed ? "Completed 🔥" : "Not Completed 😔"}
              </p>
            </div>

          </div>
        );
      }
    }
    return null;
  };

  const data = [
    { name: "Protein (g)", value: todayData?.totals?.protein?.toFixed(2) ?? 0 },
    { name: "Carbs (g)", value: todayData?.totals?.carbs?.toFixed(2) ?? 0 },
    { name: "Fat (g)", value: todayData?.totals?.fat?.toFixed(2) ?? 0 },
    { name: "Calories (kcal)", value: todayData?.totals?.calories?.toFixed(2) ?? 0 },
    { name: "Water (ml)", value: todayData?.totals?.water?.toFixed(2) ?? 0 },
  ];

  if (!todayData) return null;

  return (

    <>
      {loading && <Loader />}
      <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-50 flex flex-col   ">
        <div className="fixed top-0 rounded-md px-5 py-2 mx-[15vw] my-3 z-10 border shadow-lg border-white bg-green-100 lg:w-[70vw] ">
          <h1 className="text-2xl font-bold text-left px-10 py-3 ">
            Welcome ,Back <span className="text-green-500">{user?.name || "User"}</span> 👋
          </h1>
        </div>

        <div className="fixed top-40  right-8 ">
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            tileContent={tileContent}
            tileClassName="group"
          />

          <div className="mt-4 flex text-sm items-center gap-10 text-center bg-white p-4 rounded-lg shadow-md">
            <h1>✅  "Completed" </h1>
            <h1> 😫 "Missed"</h1>

          </div>
        </div>



        <div className="mt-40 w-[66vw] mx-30 bg-white rounded-lg shadow-md  ">
          <h2 className="text-xl ml-17 mt-5 font-bold mb-4 text-gray-700">
            Daily Nutrition Summary
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4ade80" barSize={30} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>


        <div className="bg-gradient-to-b from-white mb-20 to-green-200 shadow-lg rounded-lg p-10  mt-20 w-[66vw] mx-30">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            Today’s Meal
          </h2>
          <div className=" flex items-center gap-18 overflow-x-auto">

            {todayData.meals?.length > 0 ? (
              todayData.meals.map((meal) => (
                <div
                  key={meal._id}
                >
                  <div className="flex flex-col ">
                    <img className="w-32 h-20 mb-2" src={meal.image ? meal.image : "https://static.vecteezy.com/system/resources/previews/050/902/688/large_2x/assorted-traditional-indian-meals-with-fresh-vegetables-and-spices-on-leaf-background-food-design-for-menu-and-poster-photo.jpg"} alt={meal.name} />
                    <h3 className="text-sm text-gray-600 font-medium">{meal.name}</h3>
                    <p className="text-sm mb-2 text-gray-600">
                      {meal.mealType.toUpperCase()} | {meal.calories?.toFixed(2)} kcal
                    </p>
                    <button
                      className={`px-2 w-32 py-2 rounded-lg cursor-pointer ${meal.completed
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      disabled={meal.completed}
                      onClick={() =>
                        handleMealComplete(meal._id, {
                          protein: meal.protein?.toFixed(2),
                          carbs: meal.carbs?.toFixed(2),
                          fat: meal.fat?.toFixed(2),
                          calories: meal.calories?.toFixed(2),
                          water: meal.water?.toFixed(2),
                        })
                      }
                    >
                      {meal.completed ? "Completed" : "Mark Done"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No meals available today.</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
