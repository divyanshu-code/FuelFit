// Fully responsive Nutrition component
import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import Loader from "../Pages/Loader";

const Nutrition = () => {
    const [query, setQuery] = useState("");
    const [foodData, setFoodData] = useState(null);
    const [loading, setLoading] = useState(false);

    const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
    const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setFoodData(null);

        try {
            const res = await fetch(
                `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodeURIComponent(query)}`
            );

            const data = await res.json();
            const nutrients = data.ingredients?.[0]?.parsed?.[0]?.nutrients;
            if (!nutrients) throw new Error("No nutrition data found.");

            const nutritionInfo = {
                name: query,
                calories: nutrients.ENERC_KCAL?.quantity?.toFixed(2) || 0,
                protein: nutrients.PROCNT?.quantity?.toFixed(2) || 0,
                carbs: nutrients.CHOCDF?.quantity?.toFixed(2) || 0,
                fat: nutrients.FAT?.quantity?.toFixed(2) || 0,
                sugar: nutrients.SUGAR?.quantity?.toFixed(2) || 0,
                vitaminA: nutrients.VITA_RAE?.quantity?.toFixed(2) || 0,
                vitaminC: nutrients.VITC?.quantity?.toFixed(2) || 0,
                vitaminD: nutrients.VITD?.quantity?.toFixed(2) || 0,
                water: nutrients.WATER?.quantity?.toFixed(2) || 0,
            };

            setFoodData(nutritionInfo);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    const chartData = foodData
        ? [
              { name: "Protein (g)", value: foodData.protein },
              { name: "Carbs (g)", value: foodData.carbs },
              { name: "Fat (g)", value: foodData.fat },
              { name: "Calories", value: foodData.calories },
              { name: "Sugar (g)", value: foodData.sugar },
              { name: "Water (g)", value: foodData.water },
              { name: "Vit A (µg)", value: foodData.vitaminA },
              { name: "Vit C (mg)", value: foodData.vitaminC },
              { name: "Vit D (µg)", value: foodData.vitaminD },
          ]
        : [];

    return (
        <div id="nutrition" className="min-h-screen py-10 px-4 flex flex-col justify-center items-center">
            <h2 className="text-lg md:text-2xl font-bold italic text-gray-800 mb-1 text-center">
                Nutrition Information Lookup
            </h2>

            <p className="text-gray-700 mb-8 max-w-3xl text-sm md:text-base italic leading-relaxed  md:text-left">
                Nutrition is the process of taking in and utilizing food substances that the body needs
                for growth, energy, repair, and maintenance.
                <ul className="list-disc list-inside mt-2 lg:mt-0">
                    <li>
                        It involves nutrients like <span className="font-bold">proteins, carbohydrates, fats,
                        vitamins, minerals, and water</span>.
                    </li>
                    <li>Nutrition fuels your body so you can function at your best each day.</li>
                </ul>
            </p>

 
            <div className="w-full flex flex-col sm:flex-row justify-center gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search any food (e.g., 1 apple, 50g paneer)"
                    className="w-full sm:w-96 px-4 py-2 border rounded outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-5 py-2 rounded-lg transition-all"
                >
                    Search
                </button>
            </div>

            {loading && <Loader />}

     
            {foodData && (
                <motion.div
                    className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto mt-5"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-2xl font-semibold capitalize mb-4 text-green-600 text-center">
                        {foodData.name}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700 text-sm md:text-base">
                        <p>Protein: <b>{foodData.protein} g</b></p>
                        <p>Carbs: <b>{foodData.carbs} g</b></p>
                        <p>Fat: <b>{foodData.fat} g</b></p>
                        <p>Calories: <b>{foodData.calories} kcal</b></p>
                        <p>Sugar: <b>{foodData.sugar} g</b></p>
                        <p>Water: <b>{foodData.water} g</b></p>
                        <p>Vitamin A: <b>{foodData.vitaminA} µg</b></p>
                        <p>Vitamin C: <b>{foodData.vitaminC} mg</b></p>
                        <p>Vitamin D: <b>{foodData.vitaminD} µg</b></p>
                    </div>
                </motion.div>
            )}

            {foodData && (
                <div className=" lg:w-4xl w-[98vw] h-74 mt-10 ">
                    <ResponsiveContainer  height="100%"  >
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" interval={0} angle={-50} textAnchor="end" height={60} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#22c55e" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default Nutrition;