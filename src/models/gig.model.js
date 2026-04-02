import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        required: true,
        uppercase: true,
        default: "USD",
      },
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    owner: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: String,
      email: String,
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "completed", "cancelled", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

const Gig = mongoose.model("Gig", gigSchema);

export default Gig;