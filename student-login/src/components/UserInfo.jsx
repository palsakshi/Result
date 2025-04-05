import React, { useEffect, useState } from "react";
import myImage from '../assets/img/stu1.jpg';
import myLogo from "../assets/img/logo.jpg";

const UserInfo = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("studentInfo");
    if (storedData) {
      setStudent(JSON.parse(storedData));
    }
  }, []);

  const handleDownload = (type) => {
    // Placeholder function - Add your PDF download logic here
    alert(`Downloading ${type}`);
  };

  if (!student) {
    return (
    <>
    <div className="container d-flex flex-column justify-content-center align-items-center ">
    <div className="img_div">
              <img src={myLogo} alt="logo text" />
            </div>
     <div className="text-center mt-5">No student data found.</div>;
     </div>
     </>
     )
  }

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center ">
    <div className="img_div">
              <img src={myLogo} alt="logo text" />
            </div>

    <div className="container mt-4 text-center">
      <img
        src={myImage}
        className="img-thumbnail rounded float-left"
        style={{ width: "10%", height: "5%", float: "right" }}
        alt="..."
      />

      <table className="table table-bordered table-striped">
        <tbody className="text-start">
          <tr><td>College/Institute Name:</td><td>{student.collegeName}</td></tr>
          <tr><td>Registration No.</td><td>{student.registrationNo}</td></tr>
          <tr><td>Roll no.</td><td>{student.rollNo}</td></tr>
          <tr><td>Name of Candidate:</td><td>{student.candidateName}</td></tr>
          <tr><td>Father's Name:</td><td>{student.fatherName}</td></tr>
          <tr><td>Mother's Name:</td><td>{student.motherName}</td></tr>
          <tr><td>Course:</td><td>{student.course}</td></tr>
          <tr><td>Date of Birth:</td><td>{student.dob}</td></tr>
          <tr><td>Total Marks:</td><td>{student.totalMarks}</td></tr>
          <tr><td>Marks Obtained:</td><td>{student.marksObtained}</td></tr>
          <tr><td>Session:</td><td>{student.session}</td></tr>
        </tbody>
      </table>

      <div className="mt-3 justify-content-space-between">
        <a
          href="https://example.com/dmc"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary me-2"
        >
          View Your DMC
        </a>
        <button className="btn btn-success me-2" onClick={() => handleDownload("pdf1")}>
          Download PDF 1
        </button>
        <button className="btn btn-success" onClick={() => handleDownload("pdf2")}>
          Download PDF 2
        </button>
      </div>
    </div>
    </div>
    </>
  );
};

export default UserInfo;
