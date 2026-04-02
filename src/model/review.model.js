import mongoose from "mongoose";
import { calculateAverageRating } from "../services/reviewCalculator.js";

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

reviewSchema.post("save", async function () {
  await calculateAverageRating(this.reviewee);
});

reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await calculateAverageRating(doc.reviewee);
  }
});


const Review = mongoose.model("Review", reviewSchema);
 

export default Review;