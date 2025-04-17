const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API Routes
//app.use('/api', require('./routes/studentDetails'));
//app.use('/api', require('./routes/userRoutes'));

// ✅ Serve frontend from ./dist inside backend
if (isProduction || process.env.SERVE_FRONTEND === 'true') {
  const frontendPath = path.join(__dirname, 'dist');
  app.use(express.static(frontendPath));

  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) return next();
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// ✅ Required for Render health check
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

app.listen(PORT, '0.0.0.0', async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL DB Connected');
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  } catch (err) {
    console.error('❌ DB connection error:', err.message);
  }
});
