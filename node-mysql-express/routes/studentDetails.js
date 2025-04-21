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
router.post('/addStudent',  upload.fields([
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
      // Check if student already exists
      const existingStudent = await student_details.findOne({ where: { registrationNo } });

      if (existingStudent) {
        return res.status(400).json({ error: 'Student with this registration number already exists.' });
      }
  

    // If not, create new student
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
router.get('/allStudents', async (req, res) => {
  try {
    const students = await student_details.findAll();
    // console.log( students)
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get-single-student-info', async (req, res) => {

 
  const { regNo } = req.query;

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
// ✏️ Update student route with photo support
router.put('/updateStudent',
  upload.single('photo'), // Handle single photo upload if updated
  async (req, res) => {
    try {
      const {id} = req.query
      const student = await student_details.findByPk(id);
  
      if (!student) return res.status(404).json({ error: 'Student not found' });

      const {
        candidateName,
        fatherName,
        motherName,
        marksObtained,
        session,
        dob,
        course
      } = req.body;

      // If a new photo is uploaded
      const updatedPhoto = req.file ? req.file.filename : student.photo;

      await student.update({
        candidateName,
        fatherName,
        motherName,
        marksObtained,
        session,
        course,
        dob,
        photo: updatedPhoto
      });

      res.json({ message: 'Student updated successfully', student });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }
);


// ❌ Delete a student by ID
router.delete('/deleteStudent', async (req, res) => {
  try {
    const student = await student_details.findByPk(req.query.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    await student.destroy();
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 
