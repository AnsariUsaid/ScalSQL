const app = require('./app');
const { sequelize } = require('./config/database');

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    // No Core DB needed for demo mode — using in-memory store

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();
