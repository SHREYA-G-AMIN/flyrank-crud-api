# FlyRank CRUD API

A simple CRUD API built with Node.js and Express as part of the FlyRank Backend AI Engineering Internship.

## Features

- Create tasks
- Read all tasks
- Read task by ID
- Update tasks
- Delete tasks
- Swagger API Documentation

## Tech Stack

- Node.js
- Express.js
- Swagger UI
- JavaScript

## Installation

```bash
git clone https://github.com/SHREYA-G-AMIN/flyrank-crud-api.git
cd flyrank-crud-api
npm install
node server.js
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home |
| GET | `/health` | Health check |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

## Swagger Documentation

Open:

http://localhost:3000/api-docs

## Author

Created by **Shreya** for the FlyRank Backend AI Engineering Internship.