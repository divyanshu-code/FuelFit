import userModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"

// signup user
const signup = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name,
            email,
            password: hashpassword,
        });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// login user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Password is incorrect" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                hasFitnessDetails: user.hasFitnessDetails
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// fitness detail

const fitnessdetail = async (req, res) => {

    const { userId, age, height, weight, fitnessGoal , gender } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required." });
    }

    if (!age || isNaN(age) || age <= 0) {
        return res.status(400).json({ success: false, message: "Invalid age. Please enter a valid number." });
    }

    if (!height || isNaN(height) || height <= 0) {
        return res.status(400).json({ success: false, message: "Invalid height. Please enter a valid number." });
    }

    if (!weight || isNaN(weight) || weight <= 0) {
        return res.status(400).json({ success: false, message: "Invalid weight. Please enter a valid number." });
    }


    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                age,
                height,
                weight,
                fitnessGoal,
                gender,
                hasFitnessDetails: true
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export { signup, login, fitnessdetail }