# Task Management Application

## Overview
A full-stack Task Management Application where users can:
- Add tasks with a name and description.
- Mark tasks as completed.
- View a list of tasks, each associated with a random Cat Fact.
- Modify or delete tasks.

The project integrates a Cat Facts API to fetch random facts for tasks.

## Features

### Frontend
- Built using Vue 3.
- Responsive user interface.
- Functionalities:
  - Form to add new tasks.
  - Display a list of tasks with details (name, description, cat fact, and status).
  - Mark tasks as completed.
  - Delete tasks.


### Backend
- Built using Node.js and Express.
- RESTful API endpoints:
  - `POST /api/tasks/addTask`: Add a new task with a random Cat Fact.
  - `GET /api/tasks`: Fetch all tasks.
  - `PATCH /api/tasks/:id`: Update the status of a task.
  - `DELETE /api/tasks/:id`: Delete the status of a task.

### Database
- MongoDB for storing tasks.
- Task schema includes:
  - `name`: Task name.
  - `description`: Task description.
  - `catFact`: A random Cat Fact.
  - `status`: Task completion status.
  - `createdAt`: Timestamp.

## Technologies Used

### Frontend:
- Vue 3 + ElementPlus

### Backend:
- Node.js Express


### Database:
- MongoDB
- Mongoose (for ODM)

## Setup

### Prerequisites:
- Node.js (v16 or above)
- MongoDB (local or MongoDB Atlas)

### Installation Steps:

1. Clone the repository:
  ```bash
  git clone <repository_url>
  cd backend
  ```

2. Install the backend dependencies:
```
npm install
```

3. Set up environment variables
```
cp .env.example .env
```
***eg. of .env***
```env
NODE_ENV=development
SERVER_PORT=5000
MONGO_HOST=mongodb://localhost:27017/taskdb
MONGO_PORT=27017
MONGOOSE_DEBUG=true
```

4. Start backend
```
npm start
```

5. Start Frontend(Developer Mode)
```
cd ../frontend
npm install
npm run dev
```

6. Setup(Production)
```
cd ../frontend
npm install
npm run build
```

### API Documentation

#### POST /api/tasks/addTask
Adds a new task with a random Cat Fact.

**Request Body:**
```json
{
  "name": "Buy groceries",
  "description": "Get milk, eggs, and bread"
}
```
**Request Body:**
```json
{
  "name": "Buy groceries",
  "description": "Get milk, eggs, and bread",
  "catFact": "Cats are unable to taste anything sweet.",
  "status": "pending",
  "createdAt": "2024-12-30T10:00:00Z"
}
```

#### GET /api/tasks:
Fetches all tasks.

**Response:**
```json
[
  {
    "name": "Buy groceries",
    "description": "Get milk, eggs, and bread",
    "catFact": "Cats are unable to taste anything sweet.",
    "status": "pending",
    "createdAt": "2024-12-30T10:00:00Z"
  }
]
```

#### PATCH /api/tasks/:id:
Updates the status of a task.

**Request Body:**

```json
{
  "status": "completed"
}
```
**Response:**
```json
{
  "name": "Buy groceries",
  "description": "Get milk, eggs, and bread",
  "catFact": "Cats are unable to taste anything sweet.",
  "status": "completed",
  "createdAt": "2024-12-30T10:00:00Z"
}
```


#### DELETE /api/tasks/:id:
Updates the status of a task.

**Request Body:**

```json
{
  "id": "test-id"
}
```
**Response:**
```json
{
"message": "Task deleted successfully."
}
```

**Error Handling**

If the Cat Facts API is down or the request times out, the API will return a 503 Service Unavailable error with the message Cat Facts API is not responding.
Any other errors will return a 500 Internal Server Error with a generic error message.
