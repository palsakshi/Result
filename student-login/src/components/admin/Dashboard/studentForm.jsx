import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '../../../baseURL';

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
    session: '',
    photo: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
console.log(formData);
    try {
      await axios.post(`${baseURL}/api/add-student`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Record added successfully!');
      if (onAdd) onAdd();

      // reset form
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
        session: '',
        photo: null
      });

    } catch (err) {
      alert('Error: ' + (err?.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Student Result Form</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* 👇 Correct File Upload Field */}
        <div className="mb-4">
          <label className="form-label">Upload Student Photo</label>
          <input
            type="file" name="photo"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.files[0] })
            }
            className="form-control"
            required
          />
        </div>

        <div className="row">
          {Object.entries(formData).map(([key, value]) => {
            // 🛑 Skip the 'photo' field here
            if (key === 'photo') return null;

            return (
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
            );
          })}
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
