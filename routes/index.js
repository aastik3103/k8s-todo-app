const express = require('express');
const router = express.Router();
const taskRoutes = require('./taskRoutes');

// Health check route
router.get('/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
router.use('/tasks', taskRoutes);

module.exports = router;

