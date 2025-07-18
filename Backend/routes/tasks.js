import express from "express";
import db from "../db/connect.js";

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM tasks ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Get single task
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM tasks WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// Create new task
router.post("/", async (req, res) => {
  const { name, description, status = "pending" } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: "Task name is required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO tasks (name, description, status) VALUES (?, ?, ?)",
      [name, description, status]
    );
    
    const [newTask] = await db.execute("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    res.status(201).json(newTask[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update task
router.put("/:id", async (req, res) => {
  const { name, description, status } = req.body;
  
  try {
    const [result] = await db.execute(
      "UPDATE tasks SET name = ?, description = ?, status = ? WHERE id = ?",
      [name, description, status, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    const [updatedTask] = await db.execute("SELECT * FROM tasks WHERE id = ?", [req.params.id]);
    res.json(updatedTask[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM tasks WHERE id = ?", [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;