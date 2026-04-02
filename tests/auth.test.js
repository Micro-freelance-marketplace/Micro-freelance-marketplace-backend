import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/model/Users.js';

dotenv.config();

describe('Auth & User Model', () => {
  
  beforeAll(async () => {
    
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  });

  afterAll(async () => {
   
    await User.deleteMany({ email: /@test.com$/ });
    await mongoose.connection.close();
  });

  it('should hash the password before saving', async () => {
    const userData = {
      name: "Test User",
      email: `test_${Date.now()}@test.com`,
      password: "password123",
      campus: "AASTU"
    };
    
    const user = await User.create(userData);
    expect(user.password).not.toBe("password123");
  }, 10000); 
});