import mongoose from "mongoose";
import { calculateAverageRating } from "../services/reviewCalculator.js";

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a reviewer"],
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a reviewee"],
    },
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: [true, "Review must be linked to a gig"],
    },
    rating: {
      type: Number,
      required: [true, "Review must have a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      required: [true, "Review must have a comment"],
      trim: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ gig: 1, reviewer: 1 }, { unique: true });

reviewSchema.post("save", function () {
  calculateAverageRating(this.reviewee, this.constructor);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) await calculateAverageRating(doc.reviewee, doc.constructor);
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;