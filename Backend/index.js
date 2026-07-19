import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";
import userRouter from "./Routes/UserRoute.js";
import profileRouter from "./Routes/ProfileRoute.js";
import dashboardRouter from "./Routes/DasboardRoute.js";
import feedbackRouter from "./Routes/FeedbackRoute.js";
import chatRouter from "./Routes/ChatRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 4000;

// Database Connection
connectDB();

// Routes
app.use("/user", userRouter);
app.use("/profile" , profileRouter)
app.use('/dashboard' , dashboardRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/chat', chatRouter)

app.get("/", (req, res) => {
  res.send("Backend is Running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
