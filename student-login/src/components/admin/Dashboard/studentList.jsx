import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchRecords = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/all-students');
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">All Student Records</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Reg. No</th>
              <th>Course</th>
              <th>Marks</th>
              <th>DOB</th>
              <th>Session</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  No student records found.
                </td>
              </tr>
            ) : (
              students.map((stu) => (
                <tr key={stu.id}>
                  <td>{stu.candidateName}</td>
                  <td>{stu.rollNo}</td>
                  <td>{stu.registrationNo}</td>
                  <td>{stu.course}</td>
                  <td>
                    {stu.marksObtained}/{stu.totalMarks}
                  </td>
                  <td>{stu.dob}</td>
                  <td>{stu.session}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
