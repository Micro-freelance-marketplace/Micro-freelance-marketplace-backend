# Test JSON Fixtures — Micro Freelance Marketplace

Sample payloads the frontend can use for testing and mocking.

## Auth

### Register Request
```json
{
  "name": "Abebe Kebede",
  "email": "abebe@aastu.edu.et",
  "password": "securePass123",
  "role": "freelancer",
  "campus": "AASTU"
}
```

### Register Response (POST /auth/register)
```json
{
  "message": "User registered successfully!"
}
```

### Login Request
```json
{
  "email": "abebe@aastu.edu.et",
  "password": "securePass123"
}
```

### Login Response (POST /auth/login)
```json
{
  "message": "Logged in successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODlhYmNkZWYxMjM0NTY3ODkwYWJjZCIsInJvbGUiOiJmcmVlbGFuY2VyIiwiaWF0IjoxNzA5MDAwMDAwLCJleHAiOjE3MDkwODY0MDB9.mock_signature"
}
```

### Logout Response (GET /auth/logout)
```json
{
  "message": "Logged out successfully"
}
```

### Logout Response (GET /auth/logout)
```json
{
  "message": "Logged out successfully"
}
```

### Duplicate Register (400)
```json
{
  "message": "User validation failed: email: Already exists."
}
```

### Wrong Password (401)
```json
{
  "message": "Incorrect password"
}
```

### User Not Found (401)
```json
{
  "message": "User doesn't exist"
}
```

---

## Profile

### Create Profile Request
```json
{
  "name": "Abebe Kebede",
  "bio": "Full-stack developer specializing in React and Node.js. Passionate about building clean user experiences.",
  "skills": ["JavaScript", "React", "Node.js", "MongoDB", "Python"]
}
```

### Create Profile Response (201)
```json
{
  "_id": "6790abc123def456789",
  "user": "6789abcdef1234567890abcd",
  "name": "Abebe Kebede",
  "bio": "Full-stack developer specializing in React and Node.js. Passionate about building clean user experiences.",
  "skills": ["JavaScript", "React", "Node.js", "MongoDB", "Python"],
  "avatar": "default-avatar.jpg",
  "averageRating": 0,
  "reviewCount": 0,
  "createdAt": "2025-03-01T10:00:00.000Z",
  "updatedAt": "2025-03-01T10:00:00.000Z"
}
```

### Get Profile Response (200)
```json
{
  "_id": "6790abc123def456789",
  "user": "6789abcdef1234567890abcd",
  "name": "Abebe Kebede",
  "bio": "Full-stack developer specializing in React and Node.js.",
  "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
  "avatar": "https://res.cloudinary.com/demo/image/upload/v1234/avatars/abc123.jpg",
  "averageRating": 4.3,
  "reviewCount": 7,
  "createdAt": "2025-03-01T10:00:00.000Z",
  "updatedAt": "2025-03-15T14:30:00.000Z"
}
```

### Update Profile Request
```json
{
  "name": "Abebe K.",
  "bio": "Senior developer | React & Node.js",
  "skills": ["React", "Next.js", "TypeScript"]
}
```

### Update Profile Response (200)
```json
{
  "_id": "6790abc123def456789",
  "user": "6789abcdef1234567890abcd",
  "name": "Abebe K.",
  "bio": "Senior developer | React & Node.js",
  "skills": ["React", "Next.js", "TypeScript"],
  "avatar": "https://res.cloudinary.com/demo/image/upload/v1234/avatars/abc123.jpg",
  "averageRating": 4.3,
  "reviewCount": 7,
  "createdAt": "2025-03-01T10:00:00.000Z",
  "updatedAt": "2025-03-20T09:15:00.000Z"
}
```

### Profile Not Found (404)
```json
{ "message": "User profile not found" }
```

### Profile Already Exists (400)
```json
{ "message": "User profile already exists" }
```

### Delete Profile Response (200)
```json
{ "message": "User profile deleted successfully" }
```

### Avatar Upload (multipart/form-data)

Request: `POST /api/profile/avatar` with form field `avatar` containing an image file.

Response (200):
```json
{
  "_id": "6790abc123def456789",
  "user": "6789abcdef1234567890abcd",
  "name": "Abebe Kebede",
  "bio": "Full-stack developer.",
  "skills": ["React", "Node.js"],
  "avatar": "https://res.cloudinary.com/demo/image/upload/v1234/avatars/avatar_6789abcdef.jpg",
  "averageRating": 4.3,
  "reviewCount": 7,
  "createdAt": "2025-03-01T10:00:00.000Z",
  "updatedAt": "2025-03-20T09:30:00.000Z"
}
```

### Delete Avatar Response (200)
```json
{
  "_id": "6790abc123def456789",
  "user": "6789abcdef1234567890abcd",
  "name": "Abebe Kebede",
  "bio": "Full-stack developer.",
  "skills": ["React", "Node.js"],
  "avatar": "",
  "averageRating": 4.3,
  "reviewCount": 7,
  "createdAt": "2025-03-01T10:00:00.000Z",
  "updatedAt": "2025-03-20T09:35:00.000Z"
}
```

---

## Reviews

### Create Review Request
```json
{
  "reviewee": "6789abc111222333444555aa",
  "gig": "6789abc999888777666555zz",
  "rating": 5,
  "comment": "Excellent work! Delivered on time and exceeded expectations. Would definitely hire again."
}
```

### Create Review Response (201)
```json
{
  "message": "Review created successfully",
  "review": {
    "_id": "6790rev111222333444",
    "reviewer": "6789abcdef1234567890abcd",
    "reviewee": "6789abc111222333444555aa",
    "gig": "6789abc999888777666555zz",
    "rating": 5,
    "comment": "Excellent work! Delivered on time and exceeded expectations. Would definitely hire again.",
    "createdAt": "2025-03-15T12:00:00.000Z",
    "updatedAt": "2025-03-15T12:00:00.000Z"
  }
}
```

### Duplicate Review (400)
```json
{ "message": "You have already reviewed this gig" }
```

### Get User Reviews Response (GET /api/reviews/user/:id)
```json
[
  {
    "_id": "6790rev111222333444",
    "reviewer": {
      "_id": "6789abcdef1234567890abcd",
      "name": "Abebe Kebede",
      "avatar": "https://res.cloudinary.com/demo/image/upload/v1234/avatars/abc123.jpg"
    },
    "reviewee": "6789abc111222333444555aa",
    "gig": {
      "_id": "6789abc999888777666555zz",
      "title": "Build an e-commerce website"
    },
    "rating": 5,
    "comment": "Excellent work! Delivered on time.",
    "createdAt": "2025-03-15T12:00:00.000Z"
  },
  {
    "_id": "6790rev555666777888",
    "reviewer": {
      "_id": "6789def456789abcdef12345",
      "name": "Sara Tesfaye",
      "avatar": "default-avatar.jpg"
    },
    "reviewee": "6789abc111222333444555aa",
    "gig": {
      "_id": "6789abc111222333444555bb",
      "title": "Design a mobile app UI"
    },
    "rating": 4,
    "comment": "Good communication and solid delivery.",
    "createdAt": "2025-03-10T08:00:00.000Z"
  }
]
```

### User Not Found for Reviews (404)
```json
{ "message": "User not found" }
```

### Update Review Request
```json
{
  "rating": 4,
  "comment": "Updated: Good work but minor revisions needed."
}
```

### Update Review Response (200)
```json
{
  "message": "Review updated",
  "review": {
    "_id": "6790rev111222333444",
    "reviewer": "6789abcdef1234567890abcd",
    "reviewee": "6789abc111222333444555aa",
    "gig": "6789abc999888777666555zz",
    "rating": 4,
    "comment": "Updated: Good work but minor revisions needed.",
    "createdAt": "2025-03-15T12:00:00.000Z",
    "updatedAt": "2025-03-16T10:00:00.000Z"
  }
}
```

### Not Reviewer (403)
```json
{ "message": "Only the reviewer can edit this review" }
```

### Delete Review Response (200)
```json
{ "message": "Review deleted successfully" }
```

---

## Gig Model Reference

### Gig Request (POST /api/gigs)
```json
{
  "title": "Build a Campus Event Platform",
  "description": "Looking for a full-stack developer to create a platform for AASTU students to manage events, register, and get notifications.",
  "budget": {
    "amount": 750,
    "currency": "USD"
  },
  "category": "Web Development",
  "deadline": "2025-06-15"
}
```

### Gig List Response (200)
```json
{
  "success": true,
  "meta": {
    "total": 1,
    "page": 1,
    "pages": 1,
    "count": 1
  },
  "data": [
    {
      "_id": "6789abc999888777666555zz",
      "title": "Build an e-commerce website",
      "description": "Need a full-stack e-commerce site...",
      "budget": { "amount": 500, "currency": "USD" },
      "category": "Web Development",
      "deadline": "2025-04-30T23:59:59.000Z",
      "owner": {
        "id": "6789abc111222333444555aa",
        "name": "Dawit Mekonnen",
        "email": "dawit@aastu.edu.et"
      },
      "status": "open",
      "createdAt": "2025-02-20T10:00:00.000Z"
    }
  ]
}
```

---

## Applications

### Apply Request (POST /api/applications/apply/:gigId)
```json
{
  "coverLetter": "Dear Dawit, I am a senior Software Engineering student at AASTU with 2 years of experience in React and Node.js. I have built three similar platforms and can deliver this efficiently."
}
```

### Apply Response (201)
```json
{
  "_id": "6790app111222333444",
  "gigId": "6789abc999888777666555zz",
  "applicantId": "6789abcdef1234567890abcd",
  "coverLetter": "Dear Dawit, I am a senior Software Engineering student...",
  "status": "pending",
  "appliedAt": "2025-03-20T10:00:00.000Z",
  "createdAt": "2025-03-20T10:00:00.000Z"
}
```

### Update Status Request (PATCH /api/applications/:id/status)
```json
{
  "status": "accepted"
}
```

### Status Update Response (200)
```json
{
  "_id": "6790app111222333444",
  "gigId": "6789abc999888777666555zz",
  "applicantId": {
    "_id": "6789abcdef1234567890abcd",
    "name": "Abebe Kebede",
    "email": "abebe@aastu.edu.et"
  },
  "status": "accepted",
  "appliedAt": "2025-03-20T10:00:00.000Z"
}
```

### My Applications Response (200)
```json
[
  {
    "_id": "6790app111222333444",
    "gigId": {
      "_id": "6789abc999888777666555zz",
      "title": "Build an e-commerce website",
      "budget": { "amount": 500 }
    },
    "status": "accepted",
    "appliedAt": "2025-03-20T10:00:00.000Z"
  }
]
```

---

## User Model Reference

### Example User Object
```json
{
  "_id": "6789abcdef1234567890abcd",
  "name": "Abebe Kebede",
  "email": "abebe@aastu.edu.et",
  "role": "freelancer",
  "campus": "AASTU",
  "createdAt": "2025-03-01T10:00:00.000Z",
  "updatedAt": "2025-03-01T10:00:00.000Z"
}
```

> **Note:** The password field is never returned in responses.

---

## Error Response Patterns

### 401 Unauthorized (missing/expired token)
```json
{
  "message": "No token provided"
}
// or
{
  "message": "Failed to authenticate token"
}
// or
{
  "message": "Token expired"
}
```

### 400 Validation Error
```json
{
  "message": "<specific validation error message>"
}
```

### 500 Server Error
```json
{
  "error": "<error message>"
}
```
