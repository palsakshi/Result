const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
require('dotenv').config();
app.use(bodyParser.json());
// ggh


const studentRoutes = require('./routes/studentDetails');
const userLogin = require('./routes/userRoutes')



// const adminRoutes = require('./routes/admin');
// const adminRoutes = require('./routes/admin');


// app.use('/api', protectedRoutes);
// app.use('/api', adminRoutes);
// app.use('/api/admin', adminRoutes);

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
