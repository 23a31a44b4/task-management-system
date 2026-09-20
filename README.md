# Task Management System

A full-stack Task Management System built using Angular, Node.js, Express.js, and MongoDB.

## 📌 Project Overview

The Task Management System is a web application that allows users to create, organize, update, track, and complete their tasks efficiently.

The application provides a simple dashboard where users can manage tasks, update their status, search tasks, filter tasks, edit task details, and delete completed or unnecessary tasks.

## 🚀 Features

- Add new tasks
- View all tasks
- Edit task titles
- Delete tasks
- Update task status
- Task statuses:
  - Pending
  - In Progress
  - Completed
- Search tasks
- Filter tasks by status
- Task statistics dashboard
- Loading indicators
- Success and error messages
- Data persistence using MongoDB
- REST API using Express.js
- Responsive user interface

## 🛠️ Technologies Used

### Frontend

- Angular
- TypeScript
- HTML
- CSS
- Angular Forms
- Angular HttpClient
- RxJS

### Backend

- Node.js
- Express.js
- Mongoose
- REST API
- CORS

### Database

- MongoDB

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

## 📂 Project Structure

```text
Task Management/
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── task/
│   │       │   ├── task.ts
│   │       │   ├── task.html
│   │       │   └── task.css
│   │       │
│   │       ├── services/
│   │       │   └── task.ts
│   │       │
│   │       ├── app.ts
│   │       ├── app.html
│   │       ├── app.css
│   │       └── app.config.ts
│   │
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md