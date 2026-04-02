import UserProfile from "../model/userProfile.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ user: req.user._id })
      .populate("user", "name");
      
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const createUserProfile = async (req, res) => {
  try {
    const { name, bio, skills } = req.body;
    
    const existingProfile = await UserProfile.findOne({ user: req.user._id });
    if (existingProfile) {
      return res.status(400).json({ message: "User profile already exists" });
    }

    const userProfile = new UserProfile({
      user: req.user._id,
      name,
      bio,
      skills,
    });

    await userProfile.save();
    res.status(201).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, skills } = req.body;
    
   
    const userProfile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      { name, bio, skills },
      { new: true, runValidators: true }
    );

    if (!userProfile) return res.status(404).json({ message: "Profile not found" });
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOneAndDelete({ user: req.user._id });
    if (!userProfile) return res.status(404).json({ message: "Profile not found" });
    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

   
    const userProfile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      { avatar: req.file.path }, 
      { new: true }
    );

    if (!userProfile) return res.status(404).json({ message: "Profile not found" });
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Image upload failed" });
  }
};


export const deleteAvatar = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      { $unset: { avatar: 1 } },
      { new: true }
    );
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};