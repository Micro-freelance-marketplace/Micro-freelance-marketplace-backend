import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/model/Users.js';
import UserProfile from '../src/model/userProfile.model.js';

dotenv.config();

describe('User Profile & Profile Picture (pp) Tests', () => {
  let testUser;

  beforeAll(async () => {
   
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

  
    testUser = await User.create({
      name: "Yohannes Test",
      email: `test_${Date.now()}@test.com`,
      password: "password123",
      campus: "AASTU"
    });
  }, 15000); 
  afterAll(async () => {
    
    if (testUser) {
      await User.deleteOne({ _id: testUser._id });
      await UserProfile.deleteMany({ user: testUser._id });
    }
    await mongoose.connection.close();
  });

  it('should create a profile with the default pp', async () => {
    const profile = await UserProfile.create({
      user: testUser._id,
      name: "Yohannes Developer",
      bio: "Software Developer & Cybersecurity Engineer"
    });


    expect(profile.avatar).toBe('default-avatar.jpg'); 
  });

  it('should update the profile picture with a mock Cloudinary URL', async () => {
    const mockCloudinaryUrl = "https://res.cloudinary.com/ddzhpygyf/image/upload/v1/avatars/boro_profile.png";
    
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user: testUser._id },
      { avatar: mockCloudinaryUrl },
      { new: true }
    );

    expect(updatedProfile.avatar).toBe(mockCloudinaryUrl);
  });

  it('should ensure averageRating and reviewCount start at zero', async () => {
    const profile = await UserProfile.findOne({ user: testUser._id });
    
    
    expect(profile.averageRating).toBe(0); 
    expect(profile.reviewCount).toBe(0); 
  });
});