import userModel from "../Models/UserModel.js";
import mealModel from "../Models/MealModel.js";
import fetch from "node-fetch";

// get user data
const getuserdata = async (req, res) => {
  const { userId } = req.params;
  const today = new Date().toISOString().split("T")[0];

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let todayData = await mealModel.findOne({ userId, date: today });    

    if (!todayData) {

      const diet = user.mealtype?.toLowerCase() === "veg" ? "vegetarian" : "balanced";
      const goal = user.fitnessGoal?.toLowerCase() || "balanced";

      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${goal}&health=${diet}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        console.log(" Edamam fetch failed:", response.status, await response.text());
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

      console.log(meals);

      todayData = await mealModel.create({
        userId,
        date: today,
        meals,
        totals: { protein: 0, carbs: 0, fat: 0, calories: 0, water: 0 },
      });
    }
    return res.status(200).json({ user, todayData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

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



export { getuserdata, tickmeal };