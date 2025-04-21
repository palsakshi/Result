const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// console.log(isProduction);
const allowedOrigins = isProduction
  ? ['https://myresultapp.vercel.app']
  : ['http://localhost:5173'];

  // console.log(allowedOrigins);
  app.use(cors({
    origin: function (origin, callback) {
      console.log('🌐 Incoming origin:', origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // console.log('❌ Blocked by CORS:', origin);
        callback(new Error('❌ Not allowed by CORS'));
      }
    },
    credentials: true
  }));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api', require('./routes/studentDetails'));
app.use('/api', require('./routes/userRoutes'));


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
