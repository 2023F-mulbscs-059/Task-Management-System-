import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/connect.js";
import tasksRouter from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/tasks", tasksRouter);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is running!" });
});

// Health check route
app.get("/api/health", async (req, res) => {
  try {
    const connection = await db.getConnection();
    connection.release();
    res.json({ 
      status: "healthy", 
      database: "connected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: "unhealthy", 
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Create tables if they don't exist
const initDatabase = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Insert sample data if table is empty
    const [rows] = await db.execute("SELECT COUNT(*) as count FROM tasks");
    if (rows[0].count === 0) {
      await db.execute(`
        INSERT INTO tasks (name, description, status) VALUES
        ('Setup Project', 'Initialize the task management system', 'completed'),
        ('Create Database', 'Set up MySQL database with proper tables', 'completed'),
        ('Build API', 'Create RESTful API endpoints', 'in-progress'),
        ('Frontend Development', 'Build React frontend with Vite', 'pending'),
        ('Testing', 'Test all functionality', 'pending')
      `);
      console.log("✅ Sample tasks inserted");
    }
    
    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api/tasks`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  initDatabase();
});