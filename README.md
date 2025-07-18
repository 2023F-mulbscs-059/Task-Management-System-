# Task Management System

A full-stack task management application built with React (frontend) and Node.js/Express (backend) with MySQL database.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Task status management (Pending, In Progress, Completed)
- ✅ Modern and responsive UI with beautiful gradients
- ✅ Real-time task statistics
- ✅ MySQL database integration
- ✅ RESTful API endpoints
- ✅ CORS enabled for cross-origin requests
- ✅ Proxy setup for seamless API calls

## Project Structure

```
Task-Management-System/
├── Backend/
│   ├── db/
│   │   └── connect.js          # Database connection
│   ├── routes/
│   │   └── tasks.js            # Task routes
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env                    # Environment variables
├── Client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx    # Add task form
│   │   │   └── TaskList.jsx    # Display tasks
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Styles
│   ├── vite.config.js          # Vite configuration
│   ├── package.json
│   └── index.html
└── package.json                # Root package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL server
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-Management-System
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up MySQL Database**
   - Create a MySQL database named `task_management`
   - Update the database credentials in `Backend/.env`:
     ```
     DB_HOST=localhost
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     DB_NAME=task_management
     PORT=8800
     ```

4. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 8800) and frontend development server (port 5173).

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/health` - Health check endpoint

## Usage

1. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8800/api/tasks

2. **Add a new task**
   - Fill in the task name (required)
   - Add a description (optional)
   - Select status (Pending, In Progress, Completed)
   - Click "Add Task"

3. **Manage tasks**
   - View all tasks in the list
   - Update task status using the dropdown
   - Delete tasks using the delete button
   - View task statistics at the top

## Database Schema

The application automatically creates the following table:

```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Technologies Used

### Backend
- Node.js
- Express.js
- MySQL2
- CORS
- dotenv

### Frontend
- React 18
- Vite
- Modern CSS with gradients and animations
- Fetch API for HTTP requests

## Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend development server
- `npm run install-all` - Install dependencies for root, backend, and frontend

## Troubleshooting

1. **Database connection issues**
   - Ensure MySQL server is running
   - Check database credentials in `Backend/.env`
   - Make sure the database `task_management` exists

2. **Port conflicts**
   - Backend runs on port 8800
   - Frontend runs on port 5173
   - Make sure these ports are available

3. **API connection issues**
   - The frontend uses Vite proxy to forward `/api` requests to the backend
   - Ensure both servers are running when using `npm run dev`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.