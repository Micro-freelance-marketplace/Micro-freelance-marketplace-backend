# Micro-freelance-marketplace-backend API - Developer Documentation


## Security & Headers
- **Base URL:** `http://localhost:5000/api`
- **Auth:** All protected routes require `Authorization: Bearer <token>`
- **Safety:** All inputs are sanitized against NoSQL injection.


## 1. Auth Endpoints
- `POST /auth/register` (name, email, password, role, campus) -> 201 Created
- `POST /auth/login` (email, password) -> 200 OK + token

## 2. Gig Endpoints
- `GET /gigs` -> List all (Public)
- `POST /gigs` -> Create (Protected). Required: title (min 10), budget.amount (min 1), category, deadline (future date).
- `DELETE /gigs/:id` -> Delete (Owner only).

## 3. Application Endpoints
- `POST /applications/gigs/:id/apply` -> (coverLetter min 50 chars).
- `PATCH /applications/applications/:id/status` -> (status: "accepted" | "rejected").

## 4. Profile Endpoints
- `GET /profile` -> Returns my profile.
- `POST /profile/avatar` -> Upload image (key: 'avatar').

## 5. Review Endpoints
- `POST /reviews` -> (gigId, rating 1-5, comment).
- `GET /reviews/user/:id` -> Returns reviews for that user.

## Error Codes
- `400`: Validation failed (check `message` for details).
- `401`: Unauthorized (Missing or invalid token).
- `404`: Resource not found.
- `429`: Too many requests (Rate limit).
- `500`: Server error (Hidden in production).

## Postman Collection Link
https://go.postman.co/workspace/99e0cc14-e552-464e-a341-13b6d28b03d6/collection/47504050-5e62517f-f4ca-4e3e-b7fd-c13f6e708666