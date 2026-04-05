import Review from "../models/review.model.js";

// POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { reviewee, gig, rating, comment } = req.body;

    const existingReview = await Review.findOne({
      reviewer: req.user._id,
      gig: gig,
    });

    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this gig" });
    }

    const newReview = new Review({
      reviewer: req.user._id, 
      reviewee, 
      gig,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({ 
      message: "Review created successfully", 
      review: newReview 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while creating review" });
  }
};

// GET /api/users/:id/reviews
export const getReviewsForUser = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await Review.find({ reviewee: id })
      .populate("reviewer", "_id name avatar") 
      .populate("gig", "_id title")           
      .sort("-createdAt");                

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
};

// PUT /api/reviews/:id
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(id);

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    if (review.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the reviewer can edit this review" });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save(); 

    res.status(200).json({ message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ message: "Server error while updating review" });
  }
};

// DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    if (review.reviewer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Only the reviewer can delete this review" });
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting review" });
  }
};