const app = require('./app');
const { sequelize } = require('./config/database');

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    // We will connect and sync the DB in a later step
    // await sequelize.authenticate();
    // await sequelize.sync();
    // console.log('Database connection has been established successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();
