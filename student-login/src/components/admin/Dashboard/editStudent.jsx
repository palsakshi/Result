import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import baseURL from '../../../baseURL';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const photoRef = useRef(null);

  const [student, setStudent] = useState({
    candidateName: '',
    marksObtained: '',
    totalMarks: '',
    dob: '',
    course: '',
    session: '',
    fatherName: '',
    motherName: '',
    photo: null,
  });

  const [existingPhoto, setExistingPhoto] = useState(null);

  useEffect(() => {
    if (state?.student) {
      setStudent({ ...state.student, photo: null });
      setExistingPhoto(state.student.photo);
    } else {
      fetchStudent();
    }
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/allStudents`);
      const studentList = res.data;

      const studentData = studentList.find((s) => s.id.toString() === id.toString());

      if (!studentData) {
        alert("Student not found!");
        return;
      }

      setStudent({ ...studentData, photo: null });
      setExistingPhoto(studentData.photo);
    } catch (err) {
      console.error("Error fetching student:", err);
    }
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setStudent({ ...student, photo: e.target.files[0] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in student) {
      if (key === 'photo' && student.photo) {
        form.append('photo', student.photo);
      } else if (key !== 'photo') {
        form.append(key, student[key]);
      }
    }

    try {
      await axios.put(
        `${baseURL}/api/updateStudent/`,
        form, // 2️⃣ This is the form data
        {
          params: { id: id }, // 3️⃣ This is query parameter (?id=...)
          headers: { 'Content-Type': 'multipart/form-data' } // for file uploads
        }
      );
      alert('Student updated successfully!');
      navigate('/dashboard/StudentList');
    } catch (err) {
      console.error(err);
      alert('Error while updating student');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Edit Student</h3>
      <form onSubmit={handleUpdate} encType="multipart/form-data">

        {/* Show Existing Photo */}
        {existingPhoto && (
          <div className="mb-3">
            <label className="form-label">Current Photo:</label><br />
            <img
              src={`${baseURL}/uploads/${existingPhoto}`}
              alt="Student"
              width="120"
              height="120"
              className="img-thumbnail"
            />
          </div>
        )}

        {/* Upload New Photo */}
        <div className="mb-3">
          <label className="form-label">Change Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            ref={photoRef}
            onChange={handleFileChange}
            className="form-control"
          />
        </div>

        {/* Form Fields */}
        {[
          ['candidateName', 'Name'],
          ['fatherName', 'Father Name'],
          ['motherName', 'Mother Name'],
          ['marksObtained', 'Marks Obtained'],
          ['totalMarks', 'Total Marks'],
          ['course', 'Course'],
          ['session', 'Session'],
          ['dob', 'Date of Birth'],
        ].map(([name, label]) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={
                name === 'dob' ? 'date' :
                name.includes('Marks') ? 'number' :
                'text'
              }
              name={name}
              value={student[name] || ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}

        {/* Buttons */}
        <button type="submit" className="btn btn-success">Update</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/dashboard/StudentList')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditStudent;
