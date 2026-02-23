const bcrypt = require('bcryptjs'); // Need to install bcryptjs
const jwt = require('jsonwebtoken');
const { User, Organization } = require('../models');
const { JWT_SECRET } = require('../middlewares/authMiddleware');

const register = async (req, res) => {
  try {
    const { org_name, email, password } = req.body;

    if (!org_name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create Organization
    const organization = await Organization.create({ name: org_name });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create User (Admin by default for creators)
    const user = await User.create({
      email,
      password_hash,
      role: 'Admin',
      org_id: organization.id
    });

    res.status(201).json({ message: 'Registration successful', org_id: organization.id, user_id: user.id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Validate Password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, org_id: user.org_id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role, org_id: user.org_id }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login };
