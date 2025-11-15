import React from 'react'

const Excercise = () => {

    const fitnessGoal = localStorage.getItem('fitnessGoal');

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
    }
    return (
        <>
            {fitnessGoal ? (
                <div className="p-8  bg-gradient-to-b from-green-100 to-green-200 min-h-screen">
                    <h2 className="text-xl font-bold mb-6 text-center">Weekly Exercise Plan for {fitnessGoal}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[50vw] mx-auto">
                        {Object.entries(weeklyExercisePlan[fitnessGoal]).map(([day, exercises]) => (
                            <div key={day} className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-2">{day}</h3>
                                <ul className="list-disc list-inside">
                                    {exercises.map((exercise, index) => (
                                        <li key={index} className="text-gray-700">{exercise}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="p-8 text-center">No fitness goal set......</p>
            )}
        </>
    )
}

export default Excercise