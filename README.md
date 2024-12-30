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
  - `POST /tasks`: Add a new task with a random Cat Fact.
  - `GET /tasks`: Fetch all tasks.
  - `PATCH /tasks/:id`: Update the status of a task.
  - `DELETE /tasks/:id`: Delete a task.


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
