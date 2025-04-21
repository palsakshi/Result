import React, { useEffect, useState } from "react";
import myLogo from "../assets/img/logo.jpg";
 import baseURL from "../baseURL";
const UserInfo = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("studentInfo");
    if (storedData) {
      setStudent(JSON.parse(storedData));
    }
  }, []);
console.log(student);
  if (!student) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center ">
        <div className="img_div">
          <img src={myLogo} alt="logo text" />
        </div>
        <div className="text-center mt-5">No student data found.</div>
      </div>
    );
  }

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="img_div">
          <img src={myLogo} alt="logo text" />
        </div>

        <div className="container  text-center">
       <div style={{ width: "30%", height: "30%",float: "right",overflow: "hidden"  }}>
          <img
            src={`${baseURL}/uploads/${student.photo}`}
            className="img-thumbnail rounded "
            style={{ width: "30%", float: "right", height:"30%", objectFit:"contain" }}
            alt="Student"
          />
</div>
          <table className="table table-bordered table-striped mt-3">
            <tbody className="text-start ">
              <tr><td className="fw-bold">College/Institute Name:</td><td>{student.collegeName}</td></tr>
              <tr><td className="fw-bold">Registration No.</td><td>{student.registrationNo}</td></tr>
              <tr><td className="fw-bold">Roll No.</td><td>{student.rollNo}</td></tr>
              <tr><td className="fw-bold">Name of Candidate:</td><td>{student.candidateName}</td></tr>
              <tr><td className="fw-bold">Father's Name:</td><td>{student.fatherName}</td></tr>
              <tr><td className="fw-bold">Mother's Name:</td><td>{student.motherName}</td></tr>
              <tr><td className="fw-bold">Course:</td><td>{student.course}</td></tr>
              <tr><td className="fw-bold">Date of Birth:</td><td>{student.dob}</td></tr>
              <tr><td className="fw-bold">Total Marks:</td><td>{student.totalMarks}</td></tr>
              <tr><td className="fw-bold">Marks Obtained:</td><td>{student.marksObtained}</td></tr>
              <tr><td className="fw-bold">Session:</td><td>{student.session}</td></tr>
            </tbody>
          </table>

          {/* Marksheet Download Section */}
          <div className="container mt-4 mb-4">
            <div className="card">
              <div className="card-header bg-white  fw-bold">
                Download Marksheets
              </div>
              <div className="card-body p-0">
                <table className="table mb-0 table-bordered">
                  <tbody>
                    {student.documents && student.documents.length > 0 ? (
                      student.documents.map((doc, index) => (
                        <tr key={index}>
                          <td className="fw-bold">Marksheet {index + 1}</td>
                          <td>
                            <a
                              href={`${baseURL}/uploads/${doc.filePath}`}
                              className="text-primary fw-semibold"
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="2">No marksheets found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default UserInfo;
