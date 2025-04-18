const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors({
  origin: 'https://resultstudents-git-main-sakshis-projects-fd2c56cf.vercel.app/',

   methods:['POST', 'GET', 'PUT', 'DELETE', 'UPDATE'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api', require('./routes/studentDetails'));
app.use('/api', require('./routes/userRoutes'));

// app.use(express.static(path.join(__dirname, 'student-login', 'dist')));

// ✅ Required for Render health check
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'student-login', 'dist', 'index.html'));
// });


app.listen(PORT, '0.0.0.0', async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL DB Connected');
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  } catch (err) {
    console.error('❌ DB connection error:', err.message);
  }
});
