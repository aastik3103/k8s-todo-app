const pool = require('../config/db');

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch tasks',
      message: err.message 
    });
  }
};

// Get single task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Task not found' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch task',
      message: err.message 
    });
  }
};

// Create new task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        success: false,
        error: 'Title is required' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
      [title, description || '', status || 'pending']
    );

    console.log('Task created successfully');
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Task created successfully'
    });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create task',
      message: err.message 
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    
    // Check if task exists
    const checkResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Task not found' 
      });
    }
    
    // Update task
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [title, description, status, id]
    );
    
    res.json({
      success: true,
      data: result.rows[0],
      message: 'Task updated successfully'
    });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update task',
      message: err.message 
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Task not found' 
      });
    }
    
    res.json({ 
      success: true,
      data: result.rows[0],
      message: 'Task deleted successfully' 
    });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete task',
      message: err.message 
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};

