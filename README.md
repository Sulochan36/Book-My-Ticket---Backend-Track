# 🎬 Book My Ticket – Backend (Auth + Seat Booking)

This project is an extension of the starter code provided in the Chai Aur SQL hackathon assignment. The goal was to enhance an existing backend system by adding authentication and a protected seat booking flow.

---

## Features

* User Registration & Login (JWT आधारित authentication)
* Protected Routes using Middleware
* Seat Booking System
* Prevents Duplicate Seat Booking (Transaction + Row Locking)
* Clean Architecture (Controller, Service, Model separation)
* PostgreSQL Database Integration

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL (pg)
* JWT (jsonwebtoken)
* bcryptjs
* dotenv

---

## Project Structure

```
├── auth/
│   ├── auth.controller.js
│   ├── auth.service.js
│   ├── auth.model.js
│   ├── auth.middleware.js
│   └── auth.route.js
├── db/
│   └── pool.js
├── index.mjs
├── .env
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-link>
cd book-my-ticket
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file:

```
PORT=8080

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database

JWT_SECRET=your_secret_key
```

---

### 4. Setup Database

#### Create `users` table:

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password TEXT
);
```

#### Create `seats` table:

```
CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    isbooked INT DEFAULT 0
);
```

#### Insert sample seats:

```
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);
```

---

### 5. Run the server

```
node index.mjs
```

Server will start on:

```
http://localhost:8080
```

---

## API Endpoints

### Auth Routes

#### Register User

```
POST /auth/register
```

**Body:**

```
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

---

#### Login User

```
POST /auth/login
```

**Body:**

```
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```
{
  "user": {...},
  "token": "JWT_TOKEN"
}
```

---

#### Get Current User

```
GET /auth/me
```

**Headers:**

```
Authorization: Bearer <token>
```

---

### Seat Routes

#### Get All Seats

```
GET /seats
```

---

#### Book a Seat (Protected)

```
PUT /book/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

---

## Booking Logic

* Only authenticated users can book seats
* Uses database transactions (`BEGIN`, `COMMIT`)
* Uses `SELECT ... FOR UPDATE` to lock rows
* Prevents multiple users from booking the same seat simultaneously

---

## Learning Highlights

* Extending an existing codebase instead of building from scratch
* Implementing JWT-based authentication
* Structuring backend using MVC-like pattern
* Handling concurrency using database transactions
* Preventing race conditions in real-world scenarios

---

## Notes

* Movie data is mocked as per assignment instructions
* Frontend is not included (optional)
* Focus is on backend logic and system design

---

## Conclusion

This project demonstrates how to integrate authentication and protected operations into an existing backend system while maintaining clean code structure and ensuring data consistency.

---
