const express = require('express');
const router = express.Router();
const { createUser, getUsers, deleteUser, updateRole } = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middlewares/authMiddleware');

router.use(authenticateToken);
router.use(requireRole(['Admin'])); // Strictly Admin only

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id/role', updateRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
