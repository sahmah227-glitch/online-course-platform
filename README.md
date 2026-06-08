# EduLearn - Online Course Platform

A complete Full-Stack Online Course Platform built with React, Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based secure login and registration with Role-based access (Student / Instructor).
- **Instructor Dashboard**: Create, update, and manage courses. Add lessons to courses.
- **Student Dashboard**: Browse courses, search by category, enroll in courses, and track enrolled courses.
- **Interactive Lessons**: View course content and participate in discussion threads (comments).
- **Premium UI**: Modern, clean design using Bootstrap with custom CSS overrides for a polished feel.

## Tech Stack

- **Frontend**: React (Vite), React Router DOM, Axios, Bootstrap, Lucide React (Icons).
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), Bcrypt.js.

## Project Structure

- `client/`: React frontend application.
- `server/`: Node.js backend API.

## How to Run

### 1. Backend Setup

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure you have MongoDB running locally on `mongodb://127.0.0.1:27017` or set your `MONGO_URI` in a `.env` file.
4. Start the backend server:
   ```bash
   node server.js
   ```
   *The server will run on http://localhost:5000*

### 2. Frontend Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:5173*

## Usage Flow

1. Register a new account as an **Instructor**.
2. Go to the Dashboard and click **Create New Course**.
3. Fill in the course details and add lessons.
4. Register a second account as a **Student** (in a different browser or incognito window).
5. Browse the **Courses** page, find the course you created, and click **Enroll Now**.
6. Navigate to the course lessons, read the content, and post a **Comment**!
