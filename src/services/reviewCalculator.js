import mongoose from "mongoose";
import UserProfile from "../models/userProfile.model.js";

export async function calculateAverageRating(revieweeId, ReviewModel) {
  const result = await ReviewModel.aggregate([
    { $match: { reviewee: new mongoose.Types.ObjectId(revieweeId) } },
    {
      $group: {
        _id: "$reviewee",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    const { averageRating, reviewCount } = result[0];
    await UserProfile.findOneAndUpdate(
      { user: revieweeId },
      {
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount
      },
      { new: true }
    );
  } else {
    await UserProfile.findOneAndUpdate(
      { user: revieweeId },
      { averageRating: 0, reviewCount: 0 },
      { new: true }
    );
  }
}
