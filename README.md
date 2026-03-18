# Simple Full Stack Project (Beginner-Friendly)

This project demonstrates complete data flow:

Frontend (Next.js) -> Backend API (Express) -> MongoDB (Mongoose) -> Backend Response -> Frontend UI

## Project Structure

- `frontend/` : Next.js + TypeScript UI
- `backend/` : Express + TypeScript API + Mongoose models

## Features Included

- Home page
- Signup page
- Login page
- Contact Us page
- Admin Dashboard page
- Contact form submission flow (`POST /api/contacts`)
- Basic role system (`user` and `admin`)

## Backend API Endpoints

### Users

- `POST /api/users/signup`
- `POST /api/users/login`
- `GET /api/users`

### Contacts

- `POST /api/contacts`
- `GET /api/contacts`

## Setup Instructions

## 1. Start MongoDB

Make sure MongoDB is running locally on default port `27017`.

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside `backend/` using `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/simple_fullstack_project
```

Run backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

## 3. Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

## 4. Create Admin User Manually in MongoDB

Use Mongo shell or MongoDB Compass to insert one admin user:

```js
use simple_fullstack_project

db.users.insertOne({
  name: "Admin",
  email: "admin@example.com",
  password: "admin123",
  role: "admin"
})
```

## 5. Test Full Flow

1. Open frontend home page.
2. Signup a normal user.
3. Login with that user.
4. Submit contact form from Contact page.
5. Open Admin Dashboard to see users and contacts tables.

## Example Frontend API Calls

The frontend uses `fetch` in `frontend/src/lib/api.ts`.

Examples:

- Signup call: `POST http://localhost:5000/api/users/signup`
- Login call: `POST http://localhost:5000/api/users/login`
- Contact call: `POST http://localhost:5000/api/contacts`
- Admin data calls:
  - `GET http://localhost:5000/api/users`
  - `GET http://localhost:5000/api/contacts`

## Notes

- This project intentionally has no authentication security (as requested).
- Passwords are stored as plain text for learning/demo only.
- Console logs are added in app, routes, and controllers to show request flow clearly.
