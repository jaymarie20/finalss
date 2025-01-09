const { tasks } = require("../models/taskModel");

// Get all tasks or filter by status
const getTasks = (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(tasks.filter(task => task.status === status));
  }
  res.json(tasks);
};

// Create a new task
const createTask = (req, res) => {
  const { title, description, status, due_date } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
    due_date,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Update a task
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;

  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.due_date = due_date || task.due_date;

  res.json(task);
};

// Delete a task
const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
