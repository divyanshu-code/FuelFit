import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [todayData, setTodayData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [progressHistory, setProgressHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [exercises, setExercises] = useState([]);

  // Mobile tab state: "progress" or "track"
  const [activeTab, setActiveTab] = useState("progress");

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
      setProgressHistory(res.data.progressHistory || []);
      setStreak(res.data.streak || 0);
      setMaxStreak(res.data.maxi || 0);
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const fetchExercises = async () => {
    try {
      // guard for missing fitnessGoal
      if (!user?.fitnessGoal) return;
      const res = await axios.get(url + `/dashboard/exercise/${user.fitnessGoal}`);
      setExercises(res.data.exercises || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.fitnessGoal) fetchExercises();
    localStorage.setItem("fitnessGoal", user?.fitnessGoal || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.fitnessGoal]);

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

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const day = date.toLocaleDateString("en-CA");
    const today = new Date().toLocaleDateString("en-CA");
    const progress = progressHistory.find((d) => d.date === day);

    if (day > today) return null;

    let showEmoji = "😫";
    let statusText = "No Entry (Missed)";

    if (progress) {
      if (progress.completed) {
        showEmoji = "✅";
        statusText = "Completed 🔥";
      } else {
        showEmoji = "😫";
        statusText = "Not Completed 😔";
      }
    } else {
      const recordDates = progressHistory.map((d) => d.date);
      if (!recordDates.includes(day) && day <= today) {
        showEmoji = "😢";
        statusText = "Missed 😔";
      }
    }

    return (
      <> <div className="flex flex-col items-center justify-center relative group" style={{ lineHeight: "1", marginTop: "-15px" }} >
        <span style={{ fontSize: "1rem", marginLeft: "1px", }} > {showEmoji} </span>
      </div>
        <div className="absolute hidden group-hover:flex flex-col items-center bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-50 top-[20vh] whitespace-nowrap" >
          <p>{day}</p> <p>Status: {statusText}</p>
        </div>
      </>
    );
  };

  const data = [
    { name: "Protein (g)", value: todayData?.totals?.protein ? Number(todayData.totals.protein).toFixed(2) : 0 },
    { name: "Carbs (g)", value: todayData?.totals?.carbs ? Number(todayData.totals.carbs).toFixed(2) : 0 },
    { name: "Fat (g)", value: todayData?.totals?.fat ? Number(todayData.totals.fat).toFixed(2) : 0 },
    { name: "Calories (kcal)", value: todayData?.totals?.calories ? Number(todayData.totals.calories).toFixed(2) : 0 },
    { name: "Water (ml)", value: todayData?.totals?.water ? Number(todayData.totals.water).toFixed(2) : 0 },
  ];

  if (!todayData) return loading ? <Loader /> : null;

  return (
    <>
      {loading && <Loader />}

      <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-50 p-4 md:p-8">

        <div className="w-full bg-green-100 shadow-lg rounded-lg flex flex-col md:flex-row items-center justify-between px-4 py-3 mb-6">
          <h1 className="text-lg md:text-2xl font-bold">
            Welcome Back, <span className="text-green-500">{user?.name || "User"}</span> 👋
          </h1>

          <Link
            to="/exercises"
            className="mt-3 md:mt-0 px-5 md:px-8 py-2 bg-blue-600 text-white rounded hover:bg-black transition"
          >
            View exercises chart
          </Link>
        </div>


        <div className="md:hidden mb-5 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-4 py-2 rounded-md font-semibold shadow ${activeTab === "progress" ? "bg-green-500 text-white" : "bg-white"}`}
          >
            Progress
          </button>
          <button
            onClick={() => setActiveTab("track")}
            className={`px-4 py-2 rounded-md font-semibold shadow ${activeTab === "track" ? "bg-green-500 text-white" : "bg-white"}`}
          >
            Track
          </button>
        </div>

        <div className="hidden md:block">
          <div className="fixed top-35 right-20  w-96 ">
            <div className="mb-4 bg-white px-5 py-3 rounded-lg shadow">
              <div className="flex justify-center gap-20  text-md font-semibold text-gray-700">
                <div>Current Streak: <span className="text-green-500">🔥{streak}</span></div>
                <div>Max: <span className="text-green-500">🔥{maxStreak}</span></div>
              </div>
            </div>

            <div className="bg-white  rounded-lg shadow p-3 mb-3">
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                tileContent={tileContent}
                tileClassName="group"
                className="my-calendar"
              />
            </div>

            <div className="bg-white p-3 rounded-lg shadow text-md font-semibold flex justify-between  ">
              <span>✅ Completed</span>
              <span>😫 Not Completed</span>
              <span>😢 Missed</span>
            </div>
          </div>
        </div>

        <div className="md:pr-80">

          <div className="hidden md:block max-w-4xl">

            <div className="bg-white rounded-lg shadow-md p-6 mb-8 mt-6">
              <h2 className="text-xl ml-13 font-semibold mb-4 text-gray-700">Daily Nutrition Summary</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4ade80" barSize={28} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Today’s Meal</h2>

              <div className="flex gap-6 overflow-x-auto pb-2">
                {todayData.meals?.length > 0 ? (
                  todayData.meals.map((meal) => (
                    <div key={meal._id} className="min-w-[150px]">
                      <img
                        className="w-96 h-24 object-cover rounded-md mb-2"
                        src={meal.image}
                        alt={meal.name}
                      />
                      <h3 className="text-sm font-medium text-gray-700">{meal.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{meal.mealType?.toUpperCase()} | {meal.calories?.toFixed(2)} kcal</p>
                      <button
                        className={`w-32 text-sm px-3 py-2 rounded-md text-white ${meal.completed ? "bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
                        disabled={meal.completed}
                        onClick={() =>
                          handleMealComplete(meal._id, {
                            protein: meal.protein?.toFixed(2),
                            carbs: meal.carbs?.toFixed(2),
                            fat: meal.fat?.toFixed(2),
                            calories: meal.calories?.toFixed(2),
                            water: meal.water?.toFixed(2)
                          })
                        }
                      >
                        {meal.completed ? "Completed" : "Mark Done"}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No meals available today.</p>
                )}
              </div>
            </div>


            <div className="bg-gradient-to-b from-green-300 to-green-200 rounded-lg p-6 shadow-lg mb-12">
              <h2 className="text-xl font-bold mb-4">Exercises Suggestion for {user?.fitnessGoal}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.length ? exercises.map((ex, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                    <img src={ex.image} alt={ex.name} className="h-40 w-full object-cover rounded mb-3" />
                    <h3 className="text-lg font-semibold">{ex.name}</h3>
                    <div className="text-sm mt-2 text-gray-600">
                      {ex.sets && <p>Sets: {ex.sets}</p>}
                      {ex.reps && <p>Reps: {ex.reps}</p>}
                      {ex.duration && <p>Duration: {ex.duration}</p>}
                      <p className="text-gray-500 mt-1">Type: {ex.type}</p>
                    </div>
                  </div>
                )) : <p>No exercise suggestions.</p>}
              </div>
            </div>
          </div>


          <div className="md:hidden">
            {activeTab === "progress" && (
              <>

                <div className="bg-white  rounded-lg shadow-md px-5 py-10 mb-6 mt-2">
                  <h2 className="text-lg font-semibold mb-3">Daily Nutrition Summary</h2>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-90}/>
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#4ade80"  radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                  <h2 className="text-lg font-semibold mb-3">Today’s Meals</h2>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {todayData.meals?.length ? todayData.meals.map((meal) => (
                      <div key={meal._id} className="min-w-[140px]">
                        <img src={meal.image} alt={meal.name} className="w-full h-20 object-cover rounded mb-2" />
                        <h3 className="text-sm font-medium">{meal.name}</h3>
                        <p className="text-xs text-gray-500">{meal.calories?.toFixed(2)} kcal</p>
                        <button
                          className={`w-32 mt-2 px-2 text-sm py-2 rounded-md text-white ${meal.completed ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"}`}
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
                    )) : <p className="text-gray-600">No meals available.</p>}
                  </div>
                </div>


                <div className="bg-white rounded-lg shadow p-4 mb-8">
                  <h2 className="text-lg font-semibold mb-3">Exercise Suggestions</h2>
                  <div className="space-y-4">
                    {exercises.length ? exercises.map((ex, idx) => (
                      <div key={idx} className="bg-green-100 rounded p-3 shadow">
                        <img src={ex.image} alt={ex.name} className="w-full h-36 object-cover rounded mb-2" />
                        <h3 className="font-bold">{ex.name}</h3>
                      </div>
                    )) : <p className="text-gray-600">No exercises found.</p>}
                  </div>
                </div>
              </>
            )}

            {activeTab === "track" && (
              <div className="mb-8">
                <div className="bg-white px-4 py-3 rounded-lg shadow mb-4">
                  <div className="flex justify-between text-sm font-semibold text-gray-700">
                    <div>Current Streak: <span className="text-green-500">🔥{streak}</span></div>
                    <div>Max: <span className="text-green-500">🔥{maxStreak}</span></div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg shadow mb-4">
                  <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    tileContent={tileContent}
                    tileClassName="group"
                    className="my-calendar"
                  />
                </div>

                <div className="bg-white p-3 rounded-lg shadow text-sm font-semibold flex justify-between">
                  <span>✅ Completed</span>
                  <span>😫 Not Completed</span>
                  <span>😢 Missed</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
