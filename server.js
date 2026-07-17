const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;

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
app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"]
  });
});

// Health
app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get task by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${taskId} not found`
    });
  }

  res.json(task);
});

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});