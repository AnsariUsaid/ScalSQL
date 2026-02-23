const express = require('express');
const router = express.Router();
const { getDashboardStats, getQueryHistory } = require('../controllers/analyticsController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/dashboard', authenticateToken, getDashboardStats);
router.get('/history', authenticateToken, getQueryHistory);

module.exports = router;
