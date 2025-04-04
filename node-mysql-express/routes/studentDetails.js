const express = require('express');
const router = express.Router();
const { student_details } = require('../models');

// ➕ Add a student
router.post('/add-student', async (req, res) => {
  try {
    const student = await student_details.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📥 Get all students
router.get('/all-students', async (req, res) => {
  try {
    const students = await student_details.findAll();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📝 Update a student by ID
router.put('/update-student/:id', async (req, res) => {
  try {
    const student = await student_details.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    await student.update(req.body);
    res.json({ message: 'Student updated', student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete a student by ID
router.delete('/delete-student/:id', async (req, res) => {
  try {
    const student = await student_details.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    await student.destroy();
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
