const express = require("express");
const bodyParser = require("body-parser");
const db=require('./database/db'); // Import MySQL connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// API to Fetch All Students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// API to Insert a New Student
app.post("/students", (req, res) => {
  const {
    college_name,
    registration_no,
    roll_no,
    name,
    father_name,
    mother_name,
    course,
    dob,
    total_marks,
    marks_obtained,
    session
  } = req.body;

  const sql = `INSERT INTO students 
    (college_name, registration_no, roll_no, name, father_name, mother_name, course, dob, total_marks, marks_obtained, session) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, 
    [college_name, registration_no, roll_no, name, father_name, mother_name, course, dob, total_marks, marks_obtained, session],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Student Added!", studentId: result.insertId });
    }
  );
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
