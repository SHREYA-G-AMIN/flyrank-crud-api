const express = require("express");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0
    )
  `);
  db.get("SELECT COUNT(*) AS count FROM tasks", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO tasks (title, done) VALUES (?, ?)", ["Learn Express", 0]);
db.run("INSERT INTO tasks (title, done) VALUES (?, ?)", ["Build CRUD API", 0]);
db.run("INSERT INTO tasks (title, done) VALUES (?, ?)", ["Push to GitHub", 1]);
    }
  });
});

app.use(express.json());

const PORT = 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      version: "1.0.0",
      description: "A simple CRUD API built with Express"
    }
  },
  apis: ["./server.js"]
};

const swaggerSpec = swaggerJsdoc(options);
const tasks = [
  {
    id: 1,
    title: "Learn Express",
    done: false
  },
  {
    id: 2,
    title: "Build CRUD API",
    done: false
  },
  {
    id: 3,
    title: "Push to GitHub",
    done: true
  }
];

// Home
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Database error"
      });
    }

    const tasks = rows.map(task => ({
      ...task,
      done: Boolean(task.done)
    }));

    res.json(tasks);
  });
});

// Health
app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: Returns all tasks
 */
// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get task by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  db.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, row) => {
    if (err) {
      return res.status(500).json({
        error: "Database error"
      });
    }

    if (!row) {
      return res.status(404).json({
        error: `Task ${taskId} not found`
      });
    }

    row.done = Boolean(row.done);
    res.json(row);
  });
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 done:
 *                   type: boolean
 *       400:
 *         description: Invalid input
 */
// Create task
app.post("/tasks", (req, res) => {
  const title = req.body.title;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required"
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title: title,
    done: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${taskId} not found`
    });
  }

  const { title, done } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required"
    });
  }

  task.title = title;
  task.done = done;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const index = tasks.findIndex((task) => task.id === taskId);

  if (index === -1) {
    return res.status(404).json({
      error: `Task ${taskId} not found`
    });
  }

  tasks.splice(index, 1);

  res.json({
    message: "Task deleted successfully"
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});