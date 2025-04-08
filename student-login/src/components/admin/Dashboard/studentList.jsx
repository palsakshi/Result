import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../../baseURL';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/all-students`);
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleEditClick = (student) => {
    setEditId(student.id);
    setEditData({ ...student }); // fill current data into state
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${baseURL}/api/update-student/${id}`, editData);
      setEditId(null);
      fetchRecords(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${baseURL}/api/delete-student/${id}`);
        setStudents(students.filter((stu) => stu.id !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-muted">
                  No student records found.
                </td>
              </tr>
            ) : (
              students.map((stu) => (
                <tr key={stu.id}>
                  <td>
                    {editId === stu.id ? (
                      <input
                        type="text"
                        name="candidateName"
                        value={editData.candidateName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      stu.candidateName
                    )}
                  </td>
                  <td>
                    {editId === stu.id ? (
                      <input
                        type="text"
                        name="rollNo"
                        value={editData.rollNo}
                        onChange={handleInputChange}
                      />
                    ) : (
                      stu.rollNo
                    )}
                  </td>
                  <td>{stu.registrationNo}</td> {/* Reg. No should remain fixed */}
                  <td>
                    {editId === stu.id ? (
                      <input
                        type="text"
                        name="course"
                        value={editData.course}
                        onChange={handleInputChange}
                      />
                    ) : (
                      stu.course
                    )}
                  </td>
                  <td>
                    {editId === stu.id ? (
                      <>
                        <input
                          type="number"
                          name="marksObtained"
                          value={editData.marksObtained}
                          onChange={handleInputChange}
                          style={{ width: "45%" }}
                        />
                        /
                        <input
                          type="number"
                          name="totalMarks"
                          value={editData.totalMarks}
                          onChange={handleInputChange}
                          style={{ width: "45%" }}
                        />
                      </>
                    ) : (
                     `${stu.marksObtained}/${stu.totalMarks}`
                    )}
                  </td>
                  <td>
                    {editId === stu.id ? (
                      <input
                        type="date"
                        name="dob"
                        value={editData.dob}
                        onChange={handleInputChange}
                      />
                    ) : (
                      stu.dob
                    )}
                  </td>
                  <td>
                    {editId === stu.id ? (
                      <input
                        type="text"
                        name="session"
                        value={editData.session}
                        onChange={handleInputChange}
                      />
                    ) : (
                      stu.session
                    )}
                  </td>
                  <td>
                    {editId === stu.id ? (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleSave(stu.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEditClick(stu)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteStudent(stu.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
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