# Task Management System

This is a simple Task Management System built using Node.js, Express.js, MongoDB, and Mongoose. The system allows users to sign up, log in, and manage their tasks with CRUD (Create, Read, Update, Delete) operations. Each task is associated with a user, ensuring that users can only manage their own tasks.

## Features

- **User Authentication**
  - User signup and login functionality.
  - Secure access using JWT (JSON Web Token).

- **Task Management**
  - Create, read, update, and delete tasks.
  - Tasks are associated with the authenticated user.
  - Task fields include title, description, completion status, and timestamps.

- **Middleware**
  - Route protection to ensure only authenticated users can access task-related endpoints.
  - Input validation for all POST and PUT requests.

## Technology Stack

- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and task data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.




## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manoj9907/taskmanager.git
   cd task-manager

## API Endpoints
Authentication
POST /api/user/signup

Registers a new user.
Request body: { "name": "string", "email": "string", "password": "string" }

POST /api/user/login

Logs in a user and returns a JWT token.
Request body: { "email": "string", "password": "string" }
Tasks

GET /api/user/tasks

Retrieves all tasks for the authenticated user.

POST api/user/create-task

Creates a new task.
Request body: { "title": "string", "description": "string" }

PATCH /api/user/tasks/:taskId

Updates a task by ID.
Request body: { "title": "string", "description": "string", "completed": "boolean" }

DELETE /api/user/tasks/:taskId

Deletes a task by ID.
## Authors

- [@manojkumar](https://github.com/manoj9907/taskmanager)


