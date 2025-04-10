import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import baseURL from '../../../baseURL';
import { useNavigate } from 'react-router-dom';


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchText, setSearchText] = useState('');
 const Navigate = useNavigate();
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

  const filteredStudents = students.filter((student) =>
    student.candidateName?.toLowerCase().includes(searchText.toLowerCase()) ||
    student.rollNo?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
    student.registrationNo?.toLowerCase().includes(searchText.toLowerCase()) ||
    student.course?.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleEditClick = (student) => {
    setEditId(student.id);
    setEditData({ ...student });
    Navigate(`/editStudent/${student.id}`,  { state: { student } });
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
  const customStyles = {
    cells: {
      style: {
        paddingRight: '0px', // 🔥 This will remove right padding
        paddingLeft: '16px'  // Keep the left padding if needed
      },
    },
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${baseURL}/api/update-student/${id}`, editData);
      setEditId(null);
      fetchRecords();
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

  const columns = [
    {
      name: 'Photo',
      selector: row => editId === row.id ? (
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={(e) =>
            setEditData({ ...editData, photo: e.target.files[0] })
          }
        />
      ) : (
        <img
          src={`http://localhost:3000/uploads/${row.photo}`}
          alt="student"
          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
        />
      )
    },
    {
      name: 'Name',
      selector: row => editId === row.id ? (
        <input type="text" name="candidateName" value={editData.candidateName} onChange={handleInputChange} />
      ) : row.candidateName,
      sortable: true,
    },
    {
      name: 'Roll No',
      selector: row => row.rollNo,
      sortable: true,
    },
    {
      name: 'Reg. No',
      selector: row => row.registrationNo,
      sortable: true,
    },
    {
      name: 'Course',
      selector: row => row.course ,
      sortable: true,
     
    },
    {
      name: 'Marks',
      selector: row => editId === row.id ? (
        <>
          <input
            type="number"
            name="marksObtained"
            value={editData.marksObtained}
            onChange={handleInputChange}
            style={{ width: "40%" }}
          />
          /
          <input
            type="number"
            name="totalMarks"
            value={editData.totalMarks}
            onChange={handleInputChange}
            style={{ width: "40%" }}
          />
        </>
      ) : `${row.marksObtained}/${row.totalMarks}`,
    },
    {
      name: 'DOB',
      selector: row => editId === row.id ? (
        <input type="date" name="dob" value={editData.dob} onChange={handleInputChange} />
      ) : row.dob,
    },
    {
      name: 'Session',
      selector: row =>  row.session,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => editId === row.id ? (
        <>
          <button className="btn btn-sm btn-success me-2" onClick={() => handleSave(row.id)}>Save</button>
          <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditClick(row)}>Edit</button>
          <button className="btn btn-sm btn-danger" onClick={() => deleteStudent(row.id)}>Delete</button>
        </>
      )
    }
  ];

  return (
    
    <div className="container mt-5">
      <h3 className="text-center mb-4">All Student Records</h3>
      
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, roll no, reg. no or course..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
  
      <DataTable
        columns={columns}
        data={filteredStudents}
        pagination
        highlightOnHover
        striped
        responsive
        persistTableHead
        customStyles={ customStyles}
      />
    </div>
  );
  
};

export default StudentList;
