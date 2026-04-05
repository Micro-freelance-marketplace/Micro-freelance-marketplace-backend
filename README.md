# Micro-Freelance Marketplace Backend

Welcome to the backend of the Micro-Freelance Marketplace! This project is built with **Node.js, Express, and MongoDB**.

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory (see `.env.example` for reference).
Required keys:
- `PORT=5000`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN=1d`
- `JWT_COOKIE_EXPIRES_IN=90`

### 3. Run the Server
```bash
npm run dev
```

---

## 🛠️ Project Architecture (For Developers)

### Authentication
- **Secure Cookies**: We use `HTTP-only` cookies for JWT. The frontend does **not** need to manually manage headers. Just set `withCredentials: true` in your Axios/Fetch requests.
- **Auto-Login**: Registration automatically returns a session for the user.

### User Profiles
- **Auto-Initialization**: Profile documents are created automatically upon registration via Mongoose hooks.
- **Rating Aggregator**: The `averageRating` and `reviewCount` are updated in real-time whenever a review is posted or deleted.

### Error Handling
- Use the `AppError` class for all operational errors.
- The **Global Error Handler** catches all database errors (Duplicates, Validation) and returns clean JSON.

---

## 📡 API Standards

To keep the project consistent for the frontend team, please follow this response format:

**Success Response:**
```json
{
  "status": "success",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "status": "fail",
  "message": "User-friendly error message here"
}
```

---
