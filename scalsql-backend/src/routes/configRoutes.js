const express = require('express');
const router = express.Router();
const { saveConnection, getConnections } = require('../controllers/configController');
const { authenticateToken, requireRole } = require('../middlewares/authMiddleware');

// Get all DB connections for the organization
router.get('/db', authenticateToken, getConnections);

// Add a new DB connection (Admin only)
router.post('/db', authenticateToken, requireRole(['Admin']), saveConnection);

module.exports = router;
