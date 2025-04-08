const express = require('express');
const router = express.Router();
const { student_details , studentdocuments} = require('../models');
const multer = require('multer');



// 📁 File upload settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // folder to store images
  filename: (req, file, cb) => {
    const uniqueName =  file.originalname;
    cb(null, uniqueName);
  }
});



const upload = multer({ storage });
// ➕ Add a student
router.post('/add-student',  upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'documents', maxCount: 10 }
]),

async (req, res) => {
  try {
    const {
      collegeName, registrationNo, rollNo, candidateName,
      fatherName, motherName, course, dob, totalMarks,
      marksObtained, session
    } = req.body;

    const photo = req.files['photo'] ? req.files['photo'][0].filename : null;
    
    const student = await student_details.create({
      collegeName,
      registrationNo,
      rollNo,
      candidateName,
      fatherName,
      motherName,
      course,
      dob,
      totalMarks,
      marksObtained,
      session,
      photo
    });

      // 2️⃣ Store Documents if uploaded
      if (req.files['documents']) {
        const documentRecords = req.files['documents'].map(doc => ({
          registrationNo,
          filePath: doc.filename
        }));
  
        await studentdocuments.bulkCreate(documentRecords);
      }

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

router.get('/all-students/:regNo', async (req, res) => {
  const { regNo } = req.params;


  const student = await student_details.findOne({ where: { registrationNo: regNo },
    include: [{
      model: studentdocuments,
      as: 'documents' // this must match your association alias
    }]

  });
console.log(student);
  res.status(200).json(student); // This sends JSON data back to the frontend
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
