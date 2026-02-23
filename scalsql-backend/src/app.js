const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'ScalSQL Backend is running.' });
});

// Routes
const authRoutes = require('./routes/authRoutes');
const configRoutes = require('./routes/configRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/config', configRoutes);

// We will mount routes here later
// app.use('/api/query', queryRoutes);
// app.use('/api/config', configRoutes);

module.exports = app;
