const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
require('dotenv').config(); // Load from .env if using in development
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
// const baseUrl = require();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api', require('./routes/studentDetails'));
app.use('/api', require('./routes/userRoutes'));

// 👉 Serve frontend only in production or optionally in development
if (isProduction || process.env.SERVE_FRONTEND === 'true') {
  app.use(express.static(path.join(__dirname, 'dist')));

  // ✅ Use both patterns based on environment
  if (isProduction) {

    console.log("test");

    // For production – `{*splat}` format (some production routers like Vercel, Netlify prefer this)
    app.get('/{*splat}', (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) return next();
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
    
  } else {
    
    // For development – traditional `*` pattern
    app.get('*', (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) return next();
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  
  }
}

// Server
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL DB Connected');
    // console.log(`🚀 Server running on http://localhost:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  } catch (err) {
    // console.error('❌ DB connection error:', err.message);
  }
});
