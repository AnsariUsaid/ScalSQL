const { User, Organization } = require('../models');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const org_id = req.user.org_id;

    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password_hash,
      role,
      org_id
    });

    res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const getUsers = async (req, res) => {
  try {
    const org_id = req.user.org_id;
    const users = await User.findAll({ where: { org_id }, attributes: ['id', 'email', 'role', 'createdAt'] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const org_id = req.user.org_id;

    if (id === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete yourself' });
    }

    const deleted = await User.destroy({ where: { id, org_id } });
    if (!deleted) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const org_id = req.user.org_id;

    if (id === req.user.id) {
      return res.status(400).json({ error: 'Cannot modify your own role here' });
    }

    const updated = await User.update({ role }, { where: { id, org_id } });
    if (!updated[0]) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User role updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

module.exports = { createUser, getUsers, deleteUser, updateRole };
