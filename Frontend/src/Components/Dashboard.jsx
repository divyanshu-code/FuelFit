import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { storedata } from "../../Context/DataContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./UI/Card";
import Button from "./UI/Button";
import Badge from "./UI/Badge";
import ProgressRing from "./UI/ProgressRing";
import AnimatedCounter from "./UI/AnimatedCounter";
import ProgressCalendar from "./UI/ProgressCalendar";
import { FaFire } from "react-icons/fa";

const ProgressBar = ({ label, value, max }) => {
  // Ensure we don't divide by zero and handle undefined
  const safeValue = Number(value) || 0;
  const percent = Math.min((safeValue / max), 1);

  // Use inline styles to guarantee colors render regardless of Tailwind JIT state
  const isDanger = percent > 1;
  const isWarning = percent >= 0.8 && percent <= 1;
  const bgColor = isDanger ? '#E53E3E' : (isWarning ? '#F2803D' : '#3AA33A');
  const shadowColor = isDanger ? 'rgba(229,62,62,0.6)' : (isWarning ? 'rgba(242,128,61,0.6)' : 'rgba(58,163,58,0.6)');

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1 font-body">
        <span className="font-medium text-text-primary">{label}</span>
        <span className="text-text-secondary"><AnimatedCounter value={safeValue} duration={1} /> / {max}g</span>
      </div>
      <div className="w-full bg-surface-border rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          className="h-3 rounded-full"
          style={{
            backgroundColor: bgColor,
            boxShadow: `0 0 10px ${shadowColor}`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percent * 100}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
};

// Skeleton Loader
const DashboardSkeleton = () => (
  <div className="min-h-screen premium-bg-mesh p-4 md:p-8 lg:p-12 relative overflow-hidden font-body">
    <div className="max-w-7xl mx-auto mt-8">
      {/* Header Skeleton */}
      <div className="h-24 w-full bg-white/30 backdrop-blur-md rounded-[2rem] mb-8 animate-pulse shadow-sm"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Content Skeletons */}
          <div className="h-[400px] w-full bg-white/30 backdrop-blur-md rounded-[2rem] animate-pulse shadow-sm"></div>
          <div className="h-[500px] w-full bg-white/30 backdrop-blur-md rounded-[2rem] animate-pulse shadow-sm"></div>
        </div>
        <div className="space-y-8">
          {/* Sidebar Skeletons */}
          <div className="h-48 w-full bg-white/30 backdrop-blur-md rounded-[2rem] animate-pulse shadow-sm"></div>
          <div className="h-96 w-full bg-white/30 backdrop-blur-md rounded-[2rem] animate-pulse shadow-sm"></div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [todayData, setTodayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [progressHistory, setProgressHistory] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const token = localStorage.getItem("tokens");
  const userId = localStorage.getItem("userId");
  const { url } = useContext(storedata);

  // Dynamic goals based on user's height, weight, age, and fitness goal
  const getDynamicGoals = (user) => {
    let weight = user?.weight || 70; // fallback to 70kg
    let height = user?.height || 170; // fallback to 170cm
    let age = user?.age || 25; // fallback to 25 yrs
    let gender = user?.gender || "Male";

    // Mifflin-St Jeor Equation for BMR
    let bmr;
    if (gender === "Female") {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }

    // TDEE (Total Daily Energy Expenditure) assuming light activity
    let tdee = bmr * 1.375;
    let targetCalories = tdee;

    switch (user?.fitnessGoal) {
      case "Muscle Gain":
        targetCalories = tdee + 300;
        break;
      case "Weight Gain":
        targetCalories = tdee + 500;
        break;
      case "Fat Loss":
        targetCalories = tdee - 500;
        break;
      case "Stay Fit":
      default:
        targetCalories = tdee;
        break;
    }

    // Safety minimums
    if (gender === "Female" && targetCalories < 1200) targetCalories = 1200;
    if (gender !== "Female" && targetCalories < 1500) targetCalories = 1500;

    // Macro Split (Default: 30% P, 45% C, 25% F)
    let proteinPct = 0.30;
    let carbsPct = 0.45;
    let fatPct = 0.25;

    // Adjust macros slightly for specific goals
    if (user?.fitnessGoal === "Fat Loss" || user?.fitnessGoal === "Muscle Gain") {
      proteinPct = 0.35; // Higher protein for muscle retention/growth
      carbsPct = 0.40;
    }

    return {
      calories: Math.round(targetCalories),
      protein: Math.round((targetCalories * proteinPct) / 4),
      carbs: Math.round((targetCalories * carbsPct) / 4),
      fat: Math.round((targetCalories * fatPct) / 9)
    };
  };

  const GOALS = getDynamicGoals(user);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(url + `/dashboard/data/${userId}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      setUser(res.data.user);
      if (res.data.todayData) {
        setTodayData(res.data.todayData);

        // Update progress history for calendar
        setProgressHistory(prev => {
          const trackInfo = { date: res.data.todayData.date, completed: res.data.todayData.completed };
          const idx = prev.findIndex(p => p.date === trackInfo.date);
          if (idx !== -1) {
            const newHistory = [...prev];
            newHistory[idx] = trackInfo;
            return newHistory;
          }
          return [...prev, trackInfo];
        });
      }
      setProgressHistory(res.data.progressHistory || []);
      setStreak(res.data.streak || 0);
      setMaxStreak(res.data.maxi || 0);
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setTimeout(() => setLoading(false), 500); // Smooth exit
    }
  };

  const fetchExercises = async () => {
    try {
      if (!user?.fitnessGoal) return;
      const res = await axios.get(url + `/dashboard/exercise/${user.fitnessGoal}`);
      setExercises(res.data.exercises || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user?.fitnessGoal) fetchExercises();
    localStorage.setItem("fitnessGoal", user?.fitnessGoal || "");
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



  if (loading) return <DashboardSkeleton />;

  const consumedCals = todayData?.totals?.calories || 0;
  const remainingCals = Math.max(GOALS.calories - consumedCals, 0);

  // Staggered layout variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen premium-bg-mesh p-4 md:p-8 lg:p-12 font-body relative overflow-hidden">

      {/* Decorative Background Blobs for Glassmorphism Contrast */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandOrange-500/10 rounded-full filter blur-[120px] pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brandGreen-500/10 rounded-full filter blur-[150px] pointer-events-none -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >

        {/* Header */}
        <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
          <Card className="flex flex-col sm:flex-row items-center justify-between mb-8 p-6 bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
            <div className="flex items-center justify-center gap-8 mb-4 sm:mb-0">
              <Link to="/profile" className="absolute left-4  w-10 h-10 rounded-full bg-white/50 border border-white/60 flex items-center justify-center hover:bg-white/80 transition-all shadow-sm text-text-primary focus:outline-none">
                <span className="text-lg font-bold">←</span>
              </Link>
              <h1 className="lg:text-2xl text-md font-display font-bold lg:ml-15  text-text-primary">
                Welcome Back, <span className="text-brandGreen-500">{user?.name || "Athlete"}</span>
              </h1>
            </div>
            <Link to="/exercises">
              <Button variant="ghost" className="hover:bg-white/60  shadow-sm">View Full Exercise Chart &rarr;</Button>
            </Link>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content Area (Left / Top) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Nutrition Dashboard Card */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.01, y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
              <Card className="p-6 md:p-8 bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
                <h2 className="text-xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">

                  Daily Nutrition
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-10">
                  {/* Visually Dominant Stat */}
                  <div className="flex flex-col items-center">
                    <ProgressRing
                      value={consumedCals}
                      max={GOALS.calories}
                      size={160}
                      strokeWidth={14}
                      label="Calories"
                      unit="kcal consumed"
                    />
                    <div className="mt-4 text-center">
                      <p className="text-text-secondary text-sm">Remaining</p>
                      <p className="text-2xl font-bold font-display text-text-primary">
                        <AnimatedCounter value={remainingCals} /> kcal
                      </p>
                    </div>
                  </div>

                  {/* Macro Bars */}
                  <div className="flex-1 w-full mt-6 md:mt-0">
                    <ProgressBar label="Protein" value={todayData?.totals?.protein || 0} max={GOALS.protein} />
                    <ProgressBar label="Carbohydrates" value={todayData?.totals?.carbs || 0} max={GOALS.carbs} />
                    <ProgressBar label="Fats" value={todayData?.totals?.fat || 0} max={GOALS.fat} />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Meal Suggestions */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.01, y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
              <Card className="p-6 md:p-8 bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
                <h2 className="text-xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">

                  Meal Suggestions
                </h2>

                {todayData?.meals?.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    {todayData.meals.map((meal) => (
                      <motion.div
                        key={meal._id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                        }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-lg transition-shadow border border-surface-border flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative overflow-hidden rounded-xl mb-4 group">
                            <img
                              className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                              src={meal?.image ? meal.image : "https://img.freepik.com/free-photo/buddha-bowl-dish-with-vegetables-legumes-top-view_1150-42589.jpg"}
                              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80"; }}
                              alt={meal.name}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <h3 className="text-lg font-bold text-text-primary">{meal.name}</h3>

                          <div className="flex flex-wrap gap-2 mt-3 mb-5">
                            <Badge variant="brand">{meal.calories?.toFixed(0)} kcal</Badge>
                            <Badge variant="success">P: {meal.protein?.toFixed(0)}g</Badge>
                            <Badge variant="warning">C: {meal.carbs?.toFixed(0)}g</Badge>
                          </div>
                        </div>
                        <Button
                          variant={meal.completed ? "secondary" : "primary"}
                          className="w-full"
                          disabled={meal.completed}
                          onClick={() =>
                            handleMealComplete(meal._id, {
                              protein: meal.protein, carbs: meal.carbs, fat: meal.fat, calories: meal.calories, water: meal.water
                            })
                          }
                        >
                          {meal.completed ? "Added ✓" : "Add to Plan"}
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  // Friendly Empty State
                  <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-surface-alt rounded-xl border border-dashed border-surface-border">
                    <div className="w-16 h-16 bg-brandOrange-50 text-brandOrange-500 rounded-full flex items-center justify-center mb-4 text-2xl">
                      <FaFire />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Time to fuel your body!</h3>
                    <p className="text-text-secondary max-w-sm mb-6">You haven't logged any meals yet today. Get started to hit your goals.</p>
                    <Button variant="flame">Add a Meal</Button>
                  </div>
                )}
              </Card>
            </motion.div>


            {/* Exercise Suggestions */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.01, y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
              <Card className="p-6 md:p-8 bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
                <h2 className="text-xl font-display font-bold text-text-primary mb-2 flex items-center gap-2">
                  Exercise Suggestions
                </h2>
                <p className="text-text-secondary mb-6 text-sm ">Tailored for: <span className="font-medium text-brandGreen-600">{user?.fitnessGoal}</span></p>

                {exercises.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {exercises.slice(0, 4).map((ex, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="bg-white/80 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow border border-white flex items-center gap-4 cursor-pointer"
                        onClick={() => setSelectedExercise(ex)}
                      >
                        <img src={ex.image} alt={ex.name} className="h-16 w-16 object-cover rounded-lg shadow-sm" />
                        <div>
                          <h3 className="font-bold text-text-primary text-sm">{ex.name}</h3>
                          <p className="text-xs text-text-secondary">{ex.duration || `${ex.sets} x ${ex.reps}`}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-secondary italic">No exercise suggestions available.</p>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Sidebar (Right / Bottom) */}
          <div className="space-y-8">

            {/* Streak Card */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
              <Card className="p-6 text-center overflow-hidden relative bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brandOrange-500/10 rounded-full filter blur-[20px] -translate-y-1/2 translate-x-1/2"></div>

                <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">Consistency</h2>
                <div className="flex justify-around items-center">
                  <div>
                    <p className="text-4xl font-display font-bold text-brandOrange-500">
                      <FaFire className="inline-block mr-1 text-2xl -mt-2" />
                      <AnimatedCounter value={streak} />
                    </p>
                    <p className="text-xs text-text-secondary mt-1">Current Streak</p>
                  </div>
                  <div className="w-px h-12 bg-surface-border"></div>
                  <div>
                    <p className="text-4xl font-display font-bold text-text-primary">
                      <AnimatedCounter value={maxStreak} />
                    </p>
                    <p className="text-xs text-text-secondary mt-1">Max Streak</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Calendar Card */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
              <Card className="p-6 overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
                <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4 hidden md:block">History</h2>
                <div className="flex justify-center mb-0 md:mb-4">
                  <ProgressCalendar
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    progressHistory={progressHistory}
                  />
                </div>
                <div className="hidden md:flex justify-center gap-4 text-xs text-text-secondary mt-4 border-t border-surface-border pt-4">
                  <span className="flex items-center gap-1"><span className="text-sm leading-none">🎉</span> Meal completed</span>
                  <span className="flex items-center gap-1"><span className="text-sm leading-none">😢</span> Partial</span>
                  <span className="flex items-center gap-1"><span className="text-sm leading-none">😭</span> Missed</span>
                </div>
              </Card>
            </motion.div>

          </div>

        </div>

        {/* Exercise Detail Modal */}
        <AnimatePresence>
          {selectedExercise && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExercise(null)}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative border border-surface-border"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="absolute top-4 right-4 cursor-pointer text-text-secondary hover:text-text-primary text-xl font-bold bg-surface-alt w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  &times;
                </button>
                <div className="flex flex-col items-center text-center">
                  <img src={selectedExercise.image} alt={selectedExercise.name} className="w-full h-48 object-cover rounded-xl shadow-inner mb-6" />
                  <h2 className="text-2xl font-display font-bold text-text-primary mb-2">{selectedExercise.name}</h2>
                  <Badge variant="brand" className="mb-4">{selectedExercise.type || 'Workout'}</Badge>

                  <div className="grid grid-cols-2 gap-4 w-full mt-2">
                    <div className="bg-surface-alt p-4 rounded-xl border border-surface-border">
                      <p className="text-xs text-text-secondary uppercase tracking-wider mb-1 font-bold">Duration/Reps</p>
                      <p className="text-lg font-bold text-brandGreen-600">{selectedExercise.duration || selectedExercise.reps || "N/A"}</p>
                    </div>
                    <div className="bg-surface-alt p-4 rounded-xl border border-surface-border">
                      <p className="text-xs text-text-secondary uppercase tracking-wider mb-1 font-bold">Sets</p>
                      <p className="text-lg font-bold text-brandOrange-500">{selectedExercise.sets || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default Dashboard;
