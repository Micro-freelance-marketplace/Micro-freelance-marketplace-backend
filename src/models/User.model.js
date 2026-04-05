import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["freelancer", "poster"], default: "freelancer" },
    campus: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    }
  }, { timestamps: true }
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.post("save", async function (doc, next) {
  try {
    const UserProfile = mongoose.model("UserProfile");
    const existingProfile = await UserProfile.findOne({ user: doc._id });
    if (!existingProfile) {
      await UserProfile.create({
        user: doc._id,
        name: doc.name,
        bio: "",
        skills: [],
      });
    }
  } catch (err) {
    console.error("Error creating default user profile:", err);
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;