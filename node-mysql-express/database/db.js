const { Sequelize } = require('sequelize');
require('dotenv').config(); // 👈 Load .env variables

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // Optional: disables raw SQL logging
  }
);

// Test DB connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ Database not connected:', err.message);
  }
};

connectDB();

module.exports = sequelize;

