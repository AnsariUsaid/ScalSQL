const express = require('express');
const router = express.Router();
const { updateOrgName, changePassword } = require('../controllers/settingsController');
const { authenticateToken, requireRole } = require('../middlewares/authMiddleware');

router.use(authenticateToken);

// Update organization name (Admin only)
router.put('/organization', requireRole(['Admin']), updateOrgName);

// Change personal password (All signed-in users)
router.put('/password', changePassword);

module.exports = router;
