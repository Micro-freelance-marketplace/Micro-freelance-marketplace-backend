import { describe, it, expect } from 'vitest';
import Review from '../src/model/review.model.js';
import mongoose from 'mongoose';

describe('Review Model & Logic', () => {
  it('should fail if rating is outside the range', async () => {
    const review = new Review({
      reviewer: new mongoose.Types.ObjectId(),
      reviewee: new mongoose.Types.ObjectId(),
      gig: new mongoose.Types.ObjectId(),
      rating: 6 
    });

    const err = review.validateSync();
    expect(err.errors.rating).toBeDefined();
  });

  it('should correctly link reviewer and gig', async () => {
    const reviewerId = new mongoose.Types.ObjectId();
    const gigId = new mongoose.Types.ObjectId();
    
    const review = new Review({
      reviewer: reviewerId,
      reviewee: new mongoose.Types.ObjectId(),
      gig: gigId,
      rating: 5,
      comment: "Great work!"
    });

    expect(review.reviewer.toString()).toBe(reviewerId.toString());
    expect(review.gig.toString()).toBe(gigId.toString());
  });
});