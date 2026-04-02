import Review from "../model/review.model.js";


export const createReview = async (req, res) => {
  try {
    const { reviewee, gig, rating, comment } = req.body;


    const existingReview = await Review.findOne({
      reviewer: req.user._id,
      gig: gig,
    });

    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this gig." });
    }

    const review = new Review({
      reviewer: req.user._id, 
      reviewee, 
      gig,
      rating,
      comment,
    });


    await review.save();

    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error("Create Review Error:", error);
    res.status(500).json({ message: "Server error while creating review" });
  }
};


export const getReviewsForUser = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await Review.find({ reviewee: id })
      .populate("reviewer", "name avatar") 
      .populate("gig", "title")           
      .sort("-createdAt");                

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
};


export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

   
    const review = await Review.findOne({ _id: id, reviewer: req.user._id });

    if (!review) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save(); 

    res.status(200).json({ message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ message: "Server error while updating review" });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;


    const review = await Review.findOneAndDelete({
      _id: id,
      reviewer: req.user._id,
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting review" });
  }
};