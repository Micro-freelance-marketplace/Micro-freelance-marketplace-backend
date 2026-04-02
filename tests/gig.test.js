import { describe, it, expect } from 'vitest';
import Gig from '../src/model/gig.model.js';
import mongoose from 'mongoose';

describe('Gig Model', () => {
  it('should default status to open', async () => {
    const gig = new Gig({
      title: "Fix Backend",
      description: "Need help with ESM errors",
      budget: { amount: 100, currency: "USD" },
      category: "Development",
      deadline: new Date(),
      owner: { id: new mongoose.Types.ObjectId() }
    });

    expect(gig.status).toBe("open");
  });

  it('should enforce minimum budget', async () => {
    const gig = new Gig({ budget: { amount: -10 } });
    const err = gig.validateSync();
    expect(err.errors['budget.amount']).toBeDefined();
  });
});