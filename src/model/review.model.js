import mongoose from "mongoose";
import { calculateAverageRating } from "../services/reviewCalculator";

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


const Review = mongoose.model("Review", reviewSchema);
Review.post("save", async function () {
  await calculateAverageRating(this.reviewee);
});

Review.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await calculateAverageRating(doc.reviewee);
  }
}); 

export default Review;