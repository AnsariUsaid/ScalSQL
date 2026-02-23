const express = require('express');
const router = express.Router();
const { generateQuery, executeQuery } = require('../controllers/queryController');
const { authenticateToken, requireRole } = require('../middlewares/authMiddleware');

// Analyst & Admin can generate and execute
router.post('/generate', authenticateToken, requireRole(['Admin', 'Analyst']), generateQuery);
router.post('/execute', authenticateToken, requireRole(['Admin', 'Analyst']), executeQuery);

module.exports = router;
