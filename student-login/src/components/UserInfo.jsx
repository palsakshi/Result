import React from "react";
import myImage from '../assets/img/stu1.jpg';
// import Navbar from "./Navbar";

const UserInfo=()=>{
    return(
     <>
     {/* <Navbar/> */}
     <div className="container mt-4 text-center">
    {/* <!-- Image on top --> */}
    {/* <img src={myImage} className="img-thumbnail w-5 " alt="Image"/> */}
    <img src={myImage} className="img-thumbnail rounded float-left"  style={{width:"10%",height:"5%",float:"right"}}alt="..."></img>
{/* 
    <!-- Table --> */}
    <table className="table table-bordered table-striped">
        <thead className="">
            {/* <tr>
                <th>Column 1</th>
                <th>Column 2</th>
            </tr> */}
        </thead>
        <tbody className="text-start">
            <tr>
                <td>College/Institute Name:</td>
                <td>Dav College,Amritsar</td>
            </tr>
            <tr>
                <td>Registration No.</td>
                <td>2021.TS/A.539698</td>
            </tr>
            <tr>
                <td>Roll no.</td>
                <td>50000951587</td>
            </tr>
            <tr>
                <td>Name of Candidate:</td>
                <td>NIMMI</td>
            </tr>
            <tr>
                <td>Father's Name:</td>
                <td>RANJEET SINGH</td>
            </tr>
            <tr>
                <td>Mother's Name:</td>
                <td>KARAMJEET KAUR</td>
            </tr>
            <tr>
                <td>Course:</td>
                <td>BACHELOR OF ARTS</td>
            </tr>
            <tr>
                <td>Date of Birth:</td>
                <td>2003-10-03</td>
            </tr>
            <tr>
                <td>Total Marks:</td>
                <td>3200</td>
            </tr>
            <tr>
                <td>Marks Obtained:</td>
                <td>2003-10-03</td>
            </tr>
            <tr>
                <td>Session</td>
                <td>2021-2024</td>
            </tr>
        </tbody>
    </table>

    {/* Link and Buttons Section */}
    <div className="mt-3 justify-content-space-between">
        {/* View DMC Link */}
        <a href="https://example.com/dmc" target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">
          View Your DMC
        </a>

        {/* Download PDF Button (multiple times) */}
        <button className="btn btn-success me-2" onClick={() => handleDownload("pdf1")}>
          Download PDF 1
        </button>
        <button className="btn btn-success" onClick={() => handleDownload("pdf2")}>
          Download PDF 2
        </button>
      </div>
    </div>
    

     </>
    )
}

export default UserInfo