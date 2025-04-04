const express=require('express');
const app=express();
const db=require('./models')
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth')

// const studentRoutes=require('./routes/studentRoutes')
const userRoutes = require('./routes/userRoutes');



app.use(express.json()); // for parsing application/json
app.use('/api', authRoutes);

const studentRoutes = require('./routes/studentDetails');
app.use('/api', studentRoutes);
app.use('/users', userRoutes); 


app.get('/', (req, res) => {
  res.send('✅ Backend is working fine!');
});
// app.get('/',(res,req)=>{
//   res.json("Welcome to the API")
// })
// Start Server
app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL DB Connected');
    console.log('Server running at http://localhost:3000');
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }
});

