import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A review must have a reviewer"],
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: [true, "A review must have a target user (reviewee)"],
    },
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig", 
      required: [true, "A review must be linked to a specific gig"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: [1, "Rating must be at least 1.0"],
      max: [5, "Rating cannot be more than 5.0"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
      trim: true,
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true, 
  }
);


reviewSchema.index({ gig: 1, reviewer: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;