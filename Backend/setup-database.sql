-- Task Management System Database Setup
-- Run this script in your MySQL server to set up the database

-- Create database
CREATE DATABASE IF NOT EXISTS task_management;
USE task_management;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO tasks (name, description, status) VALUES
('Setup Project', 'Initialize the task management system', 'completed'),
('Create Database', 'Set up MySQL database with proper tables', 'completed'),
('Build API', 'Create RESTful API endpoints', 'in-progress'),
('Frontend Development', 'Build React frontend with Vite', 'pending'),
('Testing', 'Test all functionality', 'pending');

-- Display created tasks
SELECT * FROM tasks;

-- Show table structure
DESCRIBE tasks;