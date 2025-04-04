import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    collegeName: '',
    registrationNo: '',
    rollNo: '',
    candidateName: '',
    fatherName: '',
    motherName: '',
    course: '',
    dob: '',
    totalMarks: '',
    marksObtained: '',
    session: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/students/add', formData);
      alert('Record added successfully!');
      if (onAdd) onAdd();
      setFormData({
        collegeName: '',
        registrationNo: '',
        rollNo: '',
        candidateName: '',
        fatherName: '',
        motherName: '',
        course: '',
        dob: '',
        totalMarks: '',
        marksObtained: '',
        session: ''
      });
    } catch (err) {
      alert('Error: ' + (err?.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Student Result Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {Object.entries(formData).map(([key, value]) => (
            <div className="col-md-6 mb-3" key={key}>
              <label className="form-label text-capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                name={key}
                value={value}
                onChange={handleChange}
                className="form-control"
                placeholder={`Enter ${key}`}
                type={
                  key === 'dob'
                    ? 'date'
                    : key.toLowerCase().includes('marks')
                    ? 'number'
                    : 'text'
                }
                required
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="btn btn-primary px-5 mt-3" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
