import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    
    bio: {
      type: String,
      trim: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    avatar: { 
        type: String, 
        default: 'default-avatar.jpg' 
      },
    averageRating: { 
        type: Number, 
        default: 0 
    },
    reviewCount: { 
        type: Number, 
        default: 0 
    },
}, { timestamps: true }

);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;