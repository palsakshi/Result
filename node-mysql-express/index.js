const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const { sequelize } = require('./models');

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentDetails');
const userLogin = require('./routes/userRoutes')

// ✅ CORS Setup
// app.use(cors({
//   origin: 'http://localhost:5174', // 👈 Use your frontend URL
//   credentials: true // only needed if you're using cookies/auth tokens
// }));




app.use('/uploads', express.static('uploads'));
// ✅ Middleware
app.use(express.json()); // for parsing application/json
app.use(cors());
// ✅ Routes
// app.use('/api', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', userLogin);
// app.use('/users', userRoutes); 


app.get('/', (req, res) => {
  res.send('✅ Backend is working fine!');
});



// ✅ Start Server
app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL DB Connected');
    console.log('Server running at http://localhost:3000');
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }
});
