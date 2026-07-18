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
    Cell,
} from "recharts";
import { motion } from "framer-motion";
import { toast, Zoom } from "react-toastify";
import Loader from "../Pages/Loader";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Card from "./UI/Card";
import Badge from "./UI/Badge";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-soft border border-white/50">
                <p className="font-display font-bold text-text-primary mb-1">{label}</p>
                <p className="font-body font-medium text-brandGreen-600">
                    {payload[0].value} {label.includes('Calories') ? 'kcal' : ''}
                </p>
            </div>
        );
    }
    return null;
};

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

            console.log(nutrients)
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
            toast.error("Could not find nutrition data. Try another food item!", {
                transition: Zoom,
            });
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

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div id="nutrition" className="min-h-screen py-20 px-4 md:px-8 lg:px-12 flex flex-col items-center bg-transparent font-body relative">

            {/* Decorative Orbs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brandGreen-500/10 rounded-full filter blur-[100px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brandOrange-500/10 rounded-full filter blur-[120px] pointer-events-none -z-10"></div>

            <motion.div
                className="w-full max-w-4xl flex flex-col items-center z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-4 text-center">
                    Nutrition <span className="text-brandOrange-500">Lookup</span>
                </motion.h2>

                <motion.div variants={itemVariants} className="text-text-secondary mb-10 max-w-3xl text-sm md:text-base leading-relaxed text-center">
                    Nutrition is the process of taking in and utilizing food substances that the body needs for growth, energy, repair, and maintenance. Search any food below to instantly analyze its macronutrient profile.
                </motion.div>

                <motion.div variants={itemVariants} className="w-full flex flex-col sm:flex-row justify-center gap-4 mb-8 max-w-2xl mx-auto">
                    <div className="flex-1 shadow-soft rounded-xl overflow-hidden">
                        <Input
                            type="text"
                            placeholder="Search any food (e.g., 1 apple, 50g paneer)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full h-12 text-lg border-none focus:ring-0"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <Button
                        onClick={handleSearch}
                        variant="primary"
                        disabled={loading}
                        className="sm:w-auto h-12 px-8 shadow-soft hover:shadow-medium flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Analyzing...
                            </>
                        ) : (
                            "Analyze"
                        )}
                    </Button>
                </motion.div>



                {foodData && (
                    <motion.div
                        className="w-full mt-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    >
                        <Card className="p-8 relative overflow-hidden">
                            {/* Decorative accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brandGreen-500/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

                            <h3 className="text-3xl font-display font-extrabold capitalize mb-8 text-text-primary text-center">
                                {foodData.name}
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center mb-6">
                                <div className="p-4 bg-surface-alt rounded-2xl border border-surface-border/50">
                                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Protein</p>
                                    <p className="text-2xl font-display font-bold text-text-primary">{foodData.protein}<span className="text-sm font-body text-text-secondary">g</span></p>
                                </div>
                                <div className="p-4 bg-surface-alt rounded-2xl border border-surface-border/50">
                                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Carbs</p>
                                    <p className="text-2xl font-display font-bold text-text-primary">{foodData.carbs}<span className="text-sm font-body text-text-secondary">g</span></p>
                                </div>
                                <div className="p-4 bg-surface-alt rounded-2xl border border-surface-border/50">
                                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Fat</p>
                                    <p className="text-2xl font-display font-bold text-text-primary">{foodData.fat}<span className="text-sm font-body text-text-secondary">g</span></p>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-3">
                                <Badge variant="brand" className="text-sm py-1.5 px-4">🔥 {foodData.calories} kcal</Badge>
                                <Badge variant="warning" className="text-sm py-1.5 px-4">🍭 Sugar: {foodData.sugar}g</Badge>
                                <Badge variant="info" className="text-sm py-1.5 px-4">💧 Water: {foodData.water}g</Badge>
                                <Badge variant="success" className="text-sm py-1.5 px-4">Vit A: {foodData.vitaminA}µg</Badge>
                                <Badge variant="success" className="text-sm py-1.5 px-4">Vit C: {foodData.vitaminC}mg</Badge>
                                <Badge variant="success" className="text-sm py-1.5 px-4">Vit D: {foodData.vitaminD}µg</Badge>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {foodData && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }}
                        className="w-full h-[450px] mt-12 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white/40 shadow-soft"
                    >
                        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 60 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3AA33A" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#F2803D" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E0D9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} dy={10} interval={0} angle={-45} textAnchor="end" />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: 'rgba(242, 128, 61, 0.05)' }} content={<CustomTooltip />} />
                                <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 8, 8]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                )}

            </motion.div>
        </div>
    );
};

export default Nutrition;