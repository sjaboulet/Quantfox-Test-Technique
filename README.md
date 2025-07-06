
# Task Manager App

## Description

This project is a simple task management application with a NextJs frontend and a NestJS backend.
Users can create tasks, update their status (To Do, In Progress, Done), and delete tasks.
The app communicates with a RESTful API backend to persist and manage tasks.

---

## Architecture

- **Frontend**: NextJs application
  - Uses fetch to communicate with the backend API
  - Displays tasks and allows CRUD operations
  - Handles status updates via a dropdown select per task

- **Backend**: NestJS REST API
  - Handles task creation, retrieval, updating, and deletion
  - Exposes the following endpoints:

---

## Backend Endpoints

| Method | Endpoint      | Description                             |
|--------|---------------|-------------------------------------|
| GET    | `/tasks`      | Retrieve all tasks                   |
| POST   | `/tasks`      | Create a new task                   |
| PATCH  | `/tasks/:id`  | Update task (e.g., status, title)   |
| DELETE | `/tasks/:id`  | Delete a task by ID                 |

---

## How to Launch

### Backend (NestJS)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server in development mode:
   ```bash
   npm run start:dev
   ```

The backend will be running on `http://localhost:8000` by default.

---

### Frontend (NextJs)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the NextJs app:
   ```bash
   npm run start
   ```

The frontend will be accessible at `http://localhost:3000` (or the default NextJs port).

---

## Notes

- Make sure the backend is running before starting the frontend to avoid API errors.
- The frontend expects the backend API to be available at `http://localhost:8000`. Adjust the URL in the frontend code if needed.
