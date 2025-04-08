import React, { useState, useRef } from 'react';
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
    photo: null,
    documents: [] // ✅ new field for multiple files
  });
  const photoRef = useRef(null);
  const documentsRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    for (let key in formData) {
      if (key === 'documents') {
        // ✅ Append each document file
        formData.documents.forEach((file) => {
          form.append('documents', file);
        });
      } else {
        form.append(key, formData[key]);
      }
    }

    console.log(formData);
    try {
      await axios.post(`${baseURL}/api/add-student`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Record added successfully!');
      if (onAdd) onAdd();

      // ✅ reset form
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
        photo: null,
        documents: []
      });
      photoRef.current.value = null;
      documentsRef.current.value = null;
    } catch (err) {
      alert('Error: ' + (err?.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Student Result Form</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* 👇 Student Photo Upload */}
        <div className="mb-4">
          <label className="form-label">Upload Student Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            ref={photoRef}
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.files[0] })
            }
            className="form-control"
            required
          />

        </div>

      

        {/* ✅ Student Info Inputs */}
        <div className="row">
          {Object.entries(formData).map(([key, value]) => {
            if (key === 'photo' || key === 'documents') return null;

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
   {/* ✅ New Multiple File Upload */}
   <div className="mb-2">
          <label className="form-label">Upload Documents</label>
          <input
            type="file"
            name="documents"
            ref={documentsRef} 
            accept=".pdf"
            multiple
            onChange={(e) =>
              setFormData({ ...formData, documents: Array.from(e.target.files) })
            }
            className="form-control"
          />
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
