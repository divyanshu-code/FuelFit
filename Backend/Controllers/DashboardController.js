import userModel from "../Models/UserModel.js";
import mealModel from "../Models/MealModel.js";
import fetch from "node-fetch";

// get user data
const getuserdata = async (req, res) => {
  const { userId } = req.params;
  const today = new Date().toISOString().split("T")[0];
  const yesterdayDate = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let todayData = await mealModel.findOne({ userId, date: today });
    let yesterdayData = await mealModel.findOne({ userId, date: yesterdayDate });

    // Create yesterday entry if missing
    if (!yesterdayData) {
      yesterdayData = await mealModel.create({
        userId,
        date: yesterdayDate,
        meals: [],
        totals: {
          protein: 0,
          carbs: 0,
          fat: 0,
          calories: 0,
          water: 0,
        },
        completed: false,
      });
    }

    // Generate meals for today if missing
    if (!todayData) {
      const diet = user.mealtype?.toLowerCase() === "veg" ? "vegetarian" : "balanced";
      const goal = user.fitnessGoal?.toLowerCase() || "balanced";

      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${goal}&health=${diet}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        console.log("Edamam fetch failed:", response.status, await response.text());
        return res.status(500).json({ message: "Failed to fetch meals from Edamam" });
      }

      const data = await response.json();
      if (!data.hits || data.hits.length === 0)
        return res.status(404).json({ message: "No meals found from API" });

      const meals = data.hits.slice(0, 4).map((item, i) => ({
        image: item.recipe.image,
        name: item.recipe.label,
        type: user.mealtype,
        mealType: ["breakfast", "lunch", "snacks", "dinner"][i % 4],
        protein: item.recipe.totalNutrients.PROCNT?.quantity || 0,
        carbs: item.recipe.totalNutrients.CHOCDF?.quantity || 0,
        fat: item.recipe.totalNutrients.FAT?.quantity || 0,
        calories: item.recipe.calories || 0,
        water: item.recipe.totalNutrients.WATER?.quantity || 0,
      }));

      todayData = await mealModel.create({
        userId,
        date: today,
        meals,
        totals: { protein: 0, carbs: 0, fat: 0, calories: 0, water: 0 },
      });
    }

    const progressHistory = await mealModel.find({ userId }).select("date completed").sort({ date: 1 });

    const format = (d) => d.toISOString().split("T")[0];

    let streak = 0;
    let refDate = new Date();

    // If today exists but incomplete -> start from yesterday
    if (todayData && todayData.completed === false) {
      refDate.setDate(refDate.getDate() - 1);
    }

    // If today's data does NOT exist at all -> also start from yesterday
    if (!todayData) {
      refDate.setDate(refDate.getDate() - 1);
    }

    // Move backward one day at a time
    while (true) {
      const formatted = format(refDate);
      const record = progressHistory.find((r) => r.date === formatted);

      if (record && record.completed) {
        streak++;
        refDate.setDate(refDate.getDate() - 1);
      } else {
        break;        // Stop streak if missing OR not completed
      }
    }

    let maxStreak = 0;
    let temp = 0;

    for (let i = 0; i < progressHistory.length; i++) {
      if (progressHistory[i].completed) {
        temp++;
        if (temp > maxStreak) maxStreak = temp;
      } else {
        temp = 0;
      }
    }

    return res.status(200).json({
      user,
      todayData,
      yesterdayData,
      progressHistory,
      streak,
      maxi: maxStreak,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// update the db when meal completed

const tickmeal = async (req, res) => {
  const { userId } = req.params;
  const { mealId, nutrition } = req.body;
  const today = new Date().toISOString().split("T")[0];

  try {
    const track = await mealModel.findOne({ userId, date: today });
    if (!track) return res.status(404).json({ message: "No meals for today" });

    const meal = track.meals.id(mealId);
    if (!meal) return res.status(404).json({ message: "Meal not found" });

    meal.completed = true;
    track.totals.protein = Number(track.totals.protein) + Number(nutrition.protein || 0);
    track.totals.carbs = Number(track.totals.carbs) + Number(nutrition.carbs || 0);
    track.totals.fat = Number(track.totals.fat) + Number(nutrition.fat || 0);
    track.totals.calories = Number(track.totals.calories) + Number(nutrition.calories || 0);
    track.totals.water = Number(track.totals.water) + Number(nutrition.water || 0);


    const allDone = track.meals.every((m) => m.completed);
    track.completed = allDone;

    await track.save();

    res.json({ message: "Meal completed", track });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

// get exercise

const getExercises = (req, res) => {
  const { goal } = req.params;

  const exercises = {
    "Stay Fit": [
      {
        name: "Jumping Jacks",
        image: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Jumping-jack.gif",
        duration: "2 minutes",
        type: "Full Body"
      },
      {
        name: "Bodyweight Squats",
        image: "https://www.inspireusafoundation.org/file/2021/06/bodyweight-squat.gif",
        sets: "3 sets",
        reps: "15 reps",
        type: "Strength"
      },
      {
        name: "Light Jogging",
        image: "https://spotebi.com/wp-content/uploads/2014/10/run-in-place-exercise-illustration.gif",
        duration: "10–15 minutes",
        type: "Cardio"
      }
    ],

    "Muscle Gain": [
      {
        name: "Bench Press",
        image: "https://media.tenor.com/kpJH4zjuPF8AAAAM/supino.gif",
        sets: "4 sets",
        reps: "10 reps",
        type: "Strength"
      },
      {
        name: "Deadlift",
        image: "https://www.kettlebellkings.com/cdn/shop/articles/barbell-deadlift-movement.gif?v=1692228918",
        sets: "4 sets",
        reps: "8 reps",
        type: "Strength"
      },
      {
        name: "Barbell Squat",
        image: "https://media.tenor.com/pdMmsiutWkcAAAAM/gym.gif",
        sets: "4 sets",
        reps: "10 reps",
        type: "Strength"
      }
    ],

    "Fat Loss": [
      {
        name: "Burpees",
        image: "https://www.inspireusafoundation.org/file/2022/01/burpee-movement.gif",
        sets: "3 sets",
        reps: "12 reps",
        type: "HIIT"
      },
      {
        name: "Mountain Climbers",
        image: "https://fitnessprogramer.com/wp-content/uploads/2022/07/Cross-Body-Mountain-Climber.gif",
        sets: "3 sets",
        reps: "20 reps",
        type: "HIIT"
      },
      {
        name: "High Knees",
        image: "https://media.tenor.com/Uz7zm6Jm9z4AAAAM/sentadilla.gif",
        duration: "1 minute",
        type: "Cardio"
      }
    ],

    "Weight Gain": [
      {
        name: "Push Ups",
        image: "https://media.tenor.com/EEJO0ylQ8tAAAAAM/flexiones-basicas.gif",
        sets: "4 sets",
        reps: "12 reps",
        type: "Strength"
      },
      {
        name: "Dumbbell Shoulder Press",
        image: "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif",
        sets: "4 sets",
        reps: "10 reps",
        type: "Strength"
      },
      {
        name: "Pull Ups",
        image: "https://hips.hearstapps.com/hmg-prod/images/pull-up-647dd51506791.gif?resize=980:*",
        sets: "4 sets",
        reps: "10 reps",
        type: "Strength"
      }
    ]
  };

  return res.json({ exercises: exercises[goal] || [] });
};


export { getuserdata, tickmeal, getExercises};