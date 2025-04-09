import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import baseURL from '../../../baseURL';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const photoRef = useRef(null);
  const { regNo } = useParams();
  
  const [student, setStudent] = useState({
    candidateName: '',
    marksObtained: '',
    dob: '',
    course: '',
    session: '',
    fatherName: '',
    motherName: '',
    photo: null
  });

  const [existingPhoto, setExistingPhoto] = useState(null); // to show previous photo

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/all-students/:${regNo}`);
      const data = res.data;
      setStudent({ ...data, photo: null }); // we clear photo input, only show old one
      setExistingPhoto(data.photo); // store old photo path/URL
    } catch (err) {
      console.error( "eee" + err);
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
        form.append('photo', student.photo); // only append if new photo selected
      } else if (key !== 'photo') {
        form.append(key, student[key]);
      }
    }

    try {
      await axios.put(`${baseURL}/api/update-student/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert("Student updated successfully!");
      navigate('/dashboard/formList');
    } catch (err) {
      console.error(err);
      alert('Error while updating student');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Edit Student</h3>
      <form onSubmit={handleUpdate} encType="multipart/form-data">

        {/* Photo Preview + Upload */}
        {existingPhoto && (
          <div className="mb-3">
            <label className="form-label">Current Photo:</label><br />
            <img src={`${baseURL}/uploads/${existingPhoto}`} alt="Student" width="120" height="120" className="img-thumbnail" />
          </div>
        )}
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

        {/* Editable Fields */}
        {[
          ['candidateName', 'Name'],
          ['fatherName', 'Father Name'],
          ['motherName', 'Mother Name'],
          ['marksObtained', 'Marks Obtained'],
          ['course', 'Course'],
          ['session', 'Session'],
          ['dob', 'Date of Birth'],
  
        ].map(([name, label]) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={name === 'dob' ? 'date' : name.includes('Marks') ? 'number' : 'text'}
              name={name}
              value={student[name] || ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}

        <button type="submit" className="btn btn-success">Update</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/dashboard/formList')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditStudent;
