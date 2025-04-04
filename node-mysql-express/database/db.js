const sequelize =require('sequelize');
const db=new sequelize('students','root','',{
  host: 'localhost',
  dialect: 'mysql'

});

const connection=()=>{
  db.authenticate()
  .then(()=>{
    console.log('database connected')

  })
  .catch(err=>{
    console.log('database not connected',err.message)
  })
}
connection();
module.exports=db;



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
