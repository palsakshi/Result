const { Sequelize } = require('sequelize');
require('dotenv').config(); // 👈 Load .env variables

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Optional: disables raw SQL logging
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



// const mysql = require('mysql2');
// require('dotenv').config();

// Create MySQL Connection Pool
// const db = mysql.createConnection({
//     host: process.env.DB_HOST || "localhost",
//     user: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "Mysql@123",
//     database: process.env.DB_NAME || "students",
//   });

// Connect to MySQL
// db.connect((err) => {
//     if (err) {
//       console.error("❌ Error connecting to MySQL: " + err.stack);
//       return;
//     }
//     console.log("✅ Connected to MySQL as ID " + db.threadId);
//   });


// module.exports = db;
