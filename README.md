# Todo List API

A simple RESTful API for managing todo tasks with PostgreSQL database.

## Features

- ✅ Add new tasks
- ✅ Fetch all tasks
- ✅ Fetch single task by ID
- ✅ Update existing tasks
- ✅ Delete tasks
- ✅ Task fields: title, description, status

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Installation

1. Clone or navigate to the project directory:
```bash
cd mesta-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database:
```bash
createdb todo_db
```

4. Create a `.env` file in the root directory. You can either:

   **Option A:** Copy the template file:
   ```bash
   cp env.template .env
   ```

   **Option B:** Run the setup script:
   ```bash
   node setup-env.js
   ```

   **Option C:** Create manually with the following content:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=todo_db
   DB_USER=postgres
   DB_PASSWORD=your_password

   # Server Configuration
   PORT=3000
   ```

5. Update the `.env` file with your PostgreSQL credentials (especially `DB_PASSWORD`).

## Running the Application

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. Get All Tasks
**GET** `/api/tasks`

Returns all tasks ordered by creation date (newest first).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the todo list API",
      "status": "in-progress",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

### 2. Get Single Task
**GET** `/api/tasks/:id`

Returns a single task by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the todo list API",
    "status": "in-progress",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### 3. Create Task
**POST** `/api/tasks`

Creates a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description (optional)",
  "status": "pending"
}
```

**Note:** `title` is required. `description` and `status` are optional. Default `status` is "pending".

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  },
  "message": "Task created successfully"
}
```

### 4. Update Task
**PUT** `/api/tasks/:id`

Updates an existing task.

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Task",
    "description": "Updated description",
    "status": "completed",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T11:00:00.000Z"
  },
  "message": "Task updated successfully"
}
```

### 5. Delete Task
**DELETE** `/api/tasks/:id`

Deletes a task by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Task to delete",
    "description": "Description",
    "status": "pending",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  },
  "message": "Task deleted successfully"
}
```

### 6. Health Check
**GET** `/health`

Check if the server is running.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Task Status Values

The `status` field can have the following values:
- `pending` (default)
- `in-progress`
- `completed`

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error message"
}
```

## Example Usage with cURL

### Create a task:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete Node.js tutorial",
    "status": "in-progress"
  }'
```

### Get all tasks:
```bash
curl http://localhost:3000/api/tasks
```

### Get single task:
```bash
curl http://localhost:3000/api/tasks/1
```

### Update a task:
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete Node.js tutorial",
    "status": "completed"
  }'
```

### Delete a task:
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Database Schema

The `tasks` table has the following structure:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

The table is automatically created when the server starts.

## License

ISC.

