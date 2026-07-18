import React, { useContext } from 'react';
import { storedata } from '../../Context/DataContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from './UI/Card';
import Badge from './UI/Badge';
import {
    FaRunning, FaDumbbell, FaYinYang, FaBiking,
    FaWalking, FaFireAlt, FaHeartbeat, FaArrowLeft, FaBed
} from 'react-icons/fa';
import { GiJumpingDog, GiMuscleUp, GiLegArmor } from 'react-icons/gi';

// Map exercise names to relevant icons
const getExerciseIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('run') || lower.includes('jog') || lower.includes('hiit') || lower.includes('mountain')) return <FaRunning className="text-brandOrange-500" />;
    if (lower.includes('press') || lower.includes('deadlift') || lower.includes('curl') || lower.includes('raise') || lower.includes('row')) return <FaDumbbell className="text-brandGreen-500" />;
    if (lower.includes('squat') || lower.includes('lunge') || lower.includes('leg')) return <GiLegArmor className="text-blue-500" />;
    if (lower.includes('push') || lower.includes('pull') || lower.includes('dip') || lower.includes('plank') || lower.includes('crunches') || lower.includes('sit ups') || lower.includes('twist')) return <GiMuscleUp className="text-purple-500" />;
    if (lower.includes('yoga') || lower.includes('stretch')) return <FaYinYang className="text-teal-500" />;
    if (lower.includes('cycl')) return <FaBiking className="text-orange-500" />;
    if (lower.includes('walk')) return <FaWalking className="text-green-500" />;
    if (lower.includes('jump') || lower.includes('burpee')) return <GiJumpingDog className="text-red-500" />;
    if (lower.includes('rest')) return <FaBed className="text-gray-400" />;
    return <FaFireAlt className="text-brandOrange-500" />;
};

const Excercise = () => {
    // Get user from context to ensure real-time sync with profile
    const { user } = useContext(storedata);
    const fitnessGoal = user?.fitnessGoal || localStorage.getItem('fitnessGoal') || "Stay Fit";

    const weeklyExercisePlan = {
        "Stay Fit": {
            Monday: ["Jogging", "Push Ups", "Bodyweight Squats", "Yoga"],
            Tuesday: ["Jump Rope", "Plank", "Lunges", "Stretching"],
            Wednesday: ["Brisk Walk", "Jumping Jacks", "Crunches", "Squats"],
            Thursday: ["Cycling", "Mountain Climbers", "Yoga", "Burpees"],
            Friday: ["Push Ups", "Plank", "Sit Ups", "Stretching"],
            Saturday: ["Jogging", "Lunges", "Yoga", "Crunches"],
            Sunday: ["Rest or Light Stretching"],
        },
        "Muscle Gain": {
            Monday: ["Bench Press", "Incline Dumbbell Press", "Push Ups"],
            Tuesday: ["Deadlifts", "Pull Ups", "Barbell Rows"],
            Wednesday: ["Squats", "Leg Press", "Lunges"],
            Thursday: ["Overhead Press", "Lateral Raises", "Front Raises"],
            Friday: ["Bicep Curls", "Tricep Dips", "Hammer Curls"],
            Saturday: ["Weighted Planks", "Crunches", "Russian Twists"],
            Sunday: ["Rest or Light Cardio"],
        },
        "Fat Loss": {
            Monday: ["HIIT Cardio", "Burpees", "Jump Rope"],
            Tuesday: ["Mountain Climbers", "Squats", "Push Ups"],
            Wednesday: ["Jumping Jacks", "Running", "Plank"],
            Thursday: ["Cycling", "Lunges", "Crunches"],
            Friday: ["HIIT Cardio", "Burpees", "Sit Ups"],
            Saturday: ["Jogging", "Jump Rope", "Plank"],
            Sunday: ["Rest or Light Yoga"],
        },
        "Weight Gain": {
            Monday: ["Push Ups", "Bench Press", "Squats"],
            Tuesday: ["Pull Ups", "Deadlifts", "Barbell Curls"],
            Wednesday: ["Overhead Press", "Lunges", "Tricep Dips"],
            Thursday: ["Bench Press", "Weighted Planks", "Leg Press"],
            Friday: ["Deadlifts", "Bicep Curls", "Crunches"],
            Saturday: ["Push Ups", "Pull Ups", "Lateral Raises"],
            Sunday: ["Rest or Stretching"],
        }
    };

    const currentPlan = weeklyExercisePlan[fitnessGoal] || weeklyExercisePlan["Stay Fit"];

    // Framer motion variants
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
        <div className="min-h-screen bg-surface font-body overflow-x-hidden pb-12">

            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md  border-surface-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/progress" className="flex items-center gap-2 text-text-secondary hover:text-brandGreen-600 transition-colors group font-medium">
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <FaHeartbeat className="text-brandOrange-500 text-2xl" />
                        <h1 className="text-xl font-display font-bold text-text-primary hidden sm:block">FuelFit Workout</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <Badge variant="brand" className="mb-4 text-sm md:text-base px-4 py-1.5 shadow-sm">
                        {fitnessGoal} Plan
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-display font-extrabold text-text-primary mb-4">
                        Your Weekly <span className="text-brandGreen-600">Battle Plan</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        Stay consistent, push your limits, and hit your macros. Here is your structured 7-day routine.
                    </p>
                </motion.div>

                {/* Weekly Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {Object.entries(currentPlan).map(([day, exercises]) => (
                        <motion.div key={day} variants={itemVariants} whileHover={{ y: -4 }}>
                            <Card className="h-full bg-white/60 backdrop-blur-lg border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                {/* Day Header */}
                                <div className="bg-gradient-to-r from-surface-alt to-white p-4 border-b border-surface-border flex items-center justify-between">
                                    <h3 className="text-xl font-display font-bold text-text-primary">{day}</h3>
                                    {day === "Sunday" ? <FaBed className="text-blue-500 text-xl" /> : <FaFireAlt className="text-orange-500 text-xl" />}
                                </div>

                                {/* Exercises List */}
                                <div className="p-4 flex flex-col gap-3">
                                    {exercises.map((exercise, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-white border border-transparent hover:border-brandGreen-200 transition-colors shadow-sm"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-lg border border-surface-border">
                                                {getExerciseIcon(exercise)}
                                            </div>
                                            <span className="font-medium text-text-primary text-sm sm:text-base leading-tight">
                                                {exercise}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

            </main>
        </div>
    );
};

export default Excercise;