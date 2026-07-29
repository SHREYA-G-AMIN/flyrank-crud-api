# FlyRank CRUD API

A RESTful Task Management API built with **Node.js**, **Express.js**, and **SQLite**. This project demonstrates the fundamentals of backend development by implementing a complete CRUD API with persistent database storage and interactive API documentation using Swagger.

---

## Features

- Create a new task
- Retrieve all tasks
- Retrieve a task by ID
- Update an existing task
- Delete a task
- Persistent data storage using SQLite
- Automatic database and table creation
- Automatic seeding with sample data on first run
- Interactive API documentation with Swagger UI

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | REST API |
| SQLite | Database |
| sqlite3 | SQLite driver |
| Swagger UI | API Documentation |

---

## Project Structure

```
flyrank-crud-api/
│
├── server.js
├── tasks.db
├── package.json
├── package-lock.json
├── README.md
└── Screenshots/
    └── database.png
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/SHREYA-G-AMIN/flyrank-crud-api.git
cd flyrank-crud-api
```

### Install dependencies

```bash
npm install
```

### Run the server

```bash
node server.js
```

The server starts on:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Home |
| GET | /health | Health Check |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

---

## Example Request

### Create Task

```http
POST /tasks
```

```json
{
  "title": "Learn SQLite"
}
```

### Response

```json
{
  "id": 4,
  "title": "Learn SQLite",
  "done": false
}
```

---

## Database

This project uses **SQLite**, a lightweight relational database stored locally in:

```
tasks.db
```

On first launch the application automatically:

- Creates the database
- Creates the `tasks` table
- Inserts sample tasks only if the table is empty

---

## Swagger Documentation

After starting the server, open:

```
http://localhost:3000/api-docs
```

---

## SQL Queries Practiced

```sql
SELECT * FROM tasks;

SELECT * FROM tasks WHERE done = 1;

SELECT COUNT(*) FROM tasks;

UPDATE tasks SET done = 1;

DELETE FROM tasks WHERE done = 1;
```

---

## Database Preview

![Database](Screenshots/database.png)

---

## Learning Outcomes

This project demonstrates:

- REST API development
- CRUD operations
- SQLite integration
- SQL queries
- Persistent data storage
- Express middleware
- API documentation with Swagger
- Database initialization and seeding

---

