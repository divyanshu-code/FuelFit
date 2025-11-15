import userModel from "../Models/UserModel.js";

//profile 
const profile = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// upload profile 

const uploadprofile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imagePath) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profileImage: imagePath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, imageUrl: imagePath });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};

// update profile information 

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;  

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updates,
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true ,message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({success: false, message: "Server error" });
  }
};

export { profile, uploadprofile , updateUserProfile };