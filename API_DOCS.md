# Frontend API Documentation — Micro Freelance Marketplace

## Base URL

```
Development: http://localhost:5000
```

## Authentication

All protected routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

The token is returned on login and expires after 1 day.

> **Unauthenticated endpoints:** `POST /auth/register`, `POST /auth/login`, `GET /api/gigs` (list/get), `GET /health`
> **Authenticated endpoints:** everything else

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Login and get JWT token |
| GET | `/auth/logout` | No | Clear authentication (test/cleanup) |
| GET | `/auth/protected` | Yes | Verify token (test route) |

### User Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/profile` | Yes | Get current user profile |
| POST | `/api/profile` | Yes | Create current user profile |
| PUT | `/api/profile` | Yes | Update current user profile |
| DELETE | `/api/profile` | Yes | Delete current user profile |
| POST | `/api/profile/avatar` | Yes | Upload avatar image |
| DELETE | `/api/profile/avatar` | Yes | Delete avatar image |

### Reviews

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/reviews` | Yes | Create a review |
| GET | `/api/reviews/users/:id/reviews` | Yes | Get all reviews for a user |
| PUT | `/api/reviews/reviews/:id` | Yes | Update your own review |
| DELETE | `/api/reviews/reviews/:id` | Yes | Delete your own review |

### Gigs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/gigs` | No | List all gigs (with filters/search) |
| GET | `/api/gigs/:id` | No | Get single gig details |
| POST | `/api/gigs` | Yes | Create a new gig (Poster only) |
| PUT | `/api/gigs/:id` | Yes | Update gig details (Owner only) |
| PATCH | `/api/gigs/:id` | Yes | Partial update gig (Owner only) |
| DELETE | `/api/gigs/:id` | Yes | Close/Soft-delete gig (Owner only) |

### Applications

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/applications/apply/:id` | Yes | Apply for a gig (Freelancer only) |
| GET | `/api/applications/gig/:id` | Yes | See applications for a gig (Owner only) |
| PATCH | `/api/applications/:id/status` | Yes | Accept/Reject application (Owner only) |
| GET | `/api/applications/my-applications` | Yes | See my gig applications |

### Health

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | Server health check |

---

## Detailed Request / Response Specs

### POST `/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "freelancer",
  "campus": "AASTU"
}
```

**Validation:**
- `name` — required, string
- `email` — required, must be unique
- `password` — required, minimum 6 characters
- `role` — optional, `"freelancer"` | `"poster"`, default `"freelancer"`
- `campus` — required, string

**Response 201:**
```json
{ "message": "User registered successfully!" }
```

**Response 400** (duplicate email or validation error):
```json
{ "message": "<error details>" }
```

---

### POST `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response 200:**
```json
{
  "message": "Logged in successfully.",
  "token": "eyJhbGciOiJIUzI1..."
}
```

**Response 401:**
```json
{ "message": "User doesn't exist" }
// or
{ "message": "Incorrect password" }
```

---

### GET `/api/profile`

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "_id": "6789abc...",
  "user": "6789def...",
  "name": "John Doe",
  "bio": "Software Developer",
  "skills": ["JavaScript", "React", "Node.js"],
  "avatar": "https://res.cloudinary.com/...",
  "averageRating": 4.5,
  "reviewCount": 10,
  "createdAt": "2025-03-01T10:00:00.000Z",
  "updatedAt": "2025-03-15T12:00:00.000Z"
}
```

**Response 404:**
```json
{ "error": { "message": "Profile not found" } }
```

---

### POST `/api/profile`

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "John Doe",
  "bio": "Software Developer & Cybersecurity Engineer",
  "skills": ["JavaScript", "React", "Node.js"]
}
```

**Validation:**
- `name` — required, string
- `bio` — optional, string
- `skills` — optional, array of strings

**Response 201:**
```json
{
  "_id": "6789abc...",
  "user": "6789def...",
  "name": "John Doe",
  "bio": "Software Developer & Cybersecurity Engineer",
  "skills": ["JavaScript", "React", "Node.js"],
  "avatar": "default-avatar.jpg",
  "averageRating": 0,
  "reviewCount": 0,
  "createdAt": "2025-03-01T10:00:00.000Z",
  "updatedAt": "2025-03-01T10:00:00.000Z"
}
```

**Response 400:**
```json
{ "status": "fail", "message": "Profile already exists" }
```

---

### PUT `/api/profile`

**Headers:** `Authorization: Bearer <token>`

**Body (all fields optional):**
```json
{
  "name": "John Updated",
  "bio": "New bio",
  "skills": ["Python", "Django"]
}
```

**Response 200:** Updated profile object (same shape as `POST /api/profile` response)

**Response 404:**
```json
{ "error": { "message": "Profile not found" } }
```

---

### DELETE `/api/profile`

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{ "message": "User profile deleted successfully" }
```

---

### POST `/api/profile/avatar`

**Headers:** `Authorization: Bearer <token>`
**Content-Type:** `multipart/form-data`

**Form Data:**

| Field | Type | Constraints |
|-------|------|-------------|
| avatar | File | jpg, png, jpeg, webp — max 2MB |

**Response 200:** Profile object with `avatar` field set to the Cloudinary URL

---

### DELETE `/api/profile/avatar`

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Profile object with `avatar` field reset to `""`

---

### POST `/api/reviews`

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "reviewee": "6789abc...",
  "gig": "6789xyz...",
  "rating": 5,
  "comment": "Great work! Highly recommended."
}
```

**Validation:**
- `reviewee` — required, User ObjectId
- `gig` — required, Gig ObjectId
- `rating` — required, integer 1–5
- `comment` — optional, string

**Response 201:**
```json
{
  "message": "Review created successfully",
  "review": {
    "_id": "6789rev...",
    "reviewer": "6789def...",
    "reviewee": "6789abc...",
    "gig": "6789xyz...",
    "rating": 5,
    "comment": "Great work! Highly recommended.",
    "createdAt": "2025-03-15T12:00:00.000Z",
    "updatedAt": "2025-03-15T12:00:00.000Z"
  }
}
```

**Response 400:**
```json
{ "message": "You have already reviewed this gig" }
```

---

### GET `/api/reviews/users/:id/reviews`

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
[
  {
    "_id": "6789rev...",
    "reviewer": {
      "_id": "6789def...",
      "name": "Jane Doe",
      "avatar": "https://res.cloudinary.com/..."
    },
    "reviewee": "6789abc...",
    "gig": {
      "_id": "6789xyz...",
      "title": "Build a website"
    },
    "rating": 5,
    "comment": "Great work!",
    "createdAt": "2025-03-15T12:00:00.000Z"
  }
]
```

> Reviews are populated with reviewer name/avatar and gig title. Sorted newest-first.

**Response 404:**
```json
{ "error": { "message": "User not found" } }
```

---

### PUT `/api/reviews/reviews/:id`

**Headers:** `Authorization: Bearer <token>`

**Body (fields to update):**
```json
{
  "rating": 4,
  "comment": "Updated comment"
}
```

> Only the review author can update.

**Response 200:**
```json
{
  "message": "Review updated",
  "review": { /* updated review object */ }
}
```

**Response 403:**
```json
{ "message": "Only the reviewer can edit this review" }
```

---

### DELETE `/api/reviews/reviews/:id`

**Headers:** `Authorization: Bearer <token>`

> Only the review author can delete.

**Response 200:**
```json
{ "message": "Review deleted successfully" }
```

**Response 403:**
```json
{ "message": "Only the reviewer can delete this review" }
```

---

### GET `/api/gigs`

**Query Parameters:**
- `search` — string (search in title/description)
- `category` — string (filter by category)
- `page` — number (default: 1)
- `limit` — number (default: 10)

**Response 200:**
```json
{
  "success": true,
  "meta": {
    "total": 50,
    "page": 1,
    "pages": 5,
    "count": 10
  },
  "data": [
    {
      "_id": "6789abc...",
      "title": "Build a React App",
      "description": "Longer description...",
      "budget": { "amount": 500, "currency": "USD" },
      "category": "Web Dev",
      "deadline": "2025-12-01T00:00:00Z",
      "owner": { "name": "John Doe", "email": "john@example.com" },
      "status": "open"
    }
  ]
}
```

---

### POST `/api/gigs`

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "Modern Portfolio Website",
  "description": "I need a portfolio with glassmorphism...",
  "budget": { "amount": 250, "currency": "USD" },
  "category": "Design",
  "deadline": "2025-05-15"
}
```

**Response 201:** Success message + created gig object.

---

### GET `/api/gigs/:id`

**Response 200:**
```json
{
  "success": true,
  "data": {
    "_id": "6789abc...",
    "title": "Build a React App",
    "description": "Full description...",
    "budget": { "amount": 500, "currency": "USD" },
    "category": "Web Dev",
    "deadline": "2025-12-01T00:00:00.000Z",
    "owner": { "id": "user_id...", "name": "John", "email": "john@example.com" },
    "status": "open"
  }
}
```

---

### DELETE `/api/gigs/:id`

**Headers:** `Authorization: Bearer <token>`
> Soft deletes the gig by setting status to `"closed"`. Only the owner can perform this.

**Response 200:**
```json
{
  "message": "Gig closed (soft deleted) successfully",
  "data": { "status": "closed", ... }
}
```

---

### GET `/api/applications/gig/:id`

**Headers:** `Authorization: Bearer <token>`
**Params:** `:id` is the Gig ID.
> Only the gig owner can see the applications.

**Response 200:** Array of application objects with applicant details populated.

---

### GET `/api/applications/my-applications`

**Headers:** `Authorization: Bearer <token>`
> Returns all applications submitted by the current user.

**Response 200:** Array of application objects with gig details populated.

---

---

### POST `/api/applications/apply/:id`

**Headers:** `Authorization: Bearer <token>`
**Params:** `:id` is the Gig ID.

**Body:**
```json
{
  "coverLetter": "Extensive experience in React and HSL colors..."
}
```

**Response 201:**
```json
{
  "_id": "6789app...",
  "gigId": "6789gig...",
  "applicantId": "6789user...",
  "coverLetter": "Extensive experience...",
  "status": "pending",
  "appliedAt": "2025-03-20T10:00:00Z"
}
```

---

### PATCH `/api/applications/:id/status`

**Headers:** `Authorization: Bearer <token>`
**Params:** `:id` is the Application ID.

**Body:**
```json
{
  "status": "accepted" 
}
```
> Supported statuses: `"accepted"`, `"rejected"`.

**Response 200:**
```json
{
  "_id": "6789app...",
  "gigId": "6789gig...",
  "applicantId": { "_id": "6789user...", "name": "Abebe Kebede", "email": "abebe@aastu.edu.et" },
  "coverLetter": "...",
  "status": "accepted",
  "appliedAt": "2025-03-20T10:00:00Z"
}
```

---

## Data Models

### User

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | String | Yes | |
| `email` | String | Yes | Unique |
| `password` | String | Yes | Min 6 chars, stored hashed |
| `role` | String | No | `"freelancer"` \| `"poster"`, default `"freelancer"` |
| `campus` | String | Yes | |
| `createdAt` | Date | Auto | |
| `updatedAt` | Date | Auto | |

### UserProfile

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `user` | ObjectId | Yes | Ref → User |
| `name` | String | Yes | |
| `bio` | String | No | |
| `skills` | String[] | No | |
| `avatar` | String | No | Cloudinary URL, default `"default-avatar.jpg"` |
| `averageRating` | Number | No | Auto-calculated from reviews (0–5) |
| `reviewCount` | Number | No | Auto-updated |
| `createdAt` | Date | Auto | |
| `updatedAt` | Date | Auto | |

### Review

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `reviewer` | ObjectId | Yes | Ref → User (author) |
| `reviewee` | ObjectId | Yes | Ref → User (being reviewed) |
| `gig` | ObjectId | Yes | Ref → Gig |
| `rating` | Number | Yes | 1–5 |
| `comment` | String | No | |
| `createdAt` | Date | Auto | |
| `updatedAt` | Date | Auto | |

> Creating, updating, or deleting a review automatically recalculates `averageRating` and `reviewCount` on the reviewee's UserProfile.

### Gig

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | String | Yes | |
| `description` | String | Yes | |
| `budget.amount` | Number | Yes | Min 0 |
| `budget.currency` | String | Yes | Uppercase, default `"USD"` |
| `category` | String | Yes | |
| `deadline` | Date | Yes | |
| `owner.id` | ObjectId | Yes | Ref → User |
| `owner.name` | String | No | |
| `owner.email` | String | No | |
| `status` | String | No | `"open"` \| `"in_progress"` \| `"completed"` \| `"cancelled"`, default `"open"` |
| `createdAt` | Date | Auto | |
| `updatedAt` | Date | Auto | |

---

## HTTP Status Codes Summary

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request — validation error or duplicate |
| 401 | Unauthorized — missing/invalid/expired token |
| 403 | Forbidden — not the resource owner |
| 404 | Not found |
| 500 | Server error |

---

## Frontend Integration Notes

1. **Auth flow:** Register → Login (store token) → attach `Authorization: Bearer <token>` to all subsequent requests.
2. **Profile is separate:** Registration only creates a User. A UserProfile must be created separately via `POST /api/profile`.
3. **Avatar upload:** Use `multipart/form-data`, not JSON.
4. **One review per gig:** Attempting to review the same gig twice returns 400.
5. **Review ownership:** Only the review author can edit or delete a review.
6. **Rating is auto-managed:** `averageRating` and `reviewCount` on UserProfile are recalculated automatically — do not try to set them manually.
