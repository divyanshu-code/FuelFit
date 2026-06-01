import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  image: String,
  name: String,
  type: String,                    // veg / non-veg / both
  mealType: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  calories: Number,
  water: Number,
  completed: { type: Boolean, default: false },
});

const userMealTrackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  meals: [mealSchema],
  totals: {
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    water: { type: Number, default: 0 },
  },
  completed: { type: Boolean, default: false },
});

const mealModel = mongoose.models.usermeal || mongoose.model("usermeal", userMealTrackSchema);
export default mealModel;
