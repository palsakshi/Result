import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import myLogo from "../assets/img/logo.jpg";

const Search = () => {
  const [regNo, setRegNo] = useState("");
  const navigate = useNavigate();

  const handleShowResult = async () => {
    if (!regNo) {
      alert("Please enter Registration Number");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/students/${regNo}`);
      
      if (res.data) {
        // Store the result in localStorage
        localStorage.setItem("studentData", JSON.stringify(res.data));
        // Navigate to user info page
        navigate("/userInfo");
      } else {
        alert("Student not found");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      alert("Student not found or API error");
    }
  };

  return (
    <>
      <div className="main_head d-flex justify-content-center align-items-center flex-column">
        <div className="img_div">
          <img src={myLogo} alt="logo text" />
        </div>

        <div className="filed">
          <h2>Results</h2>

          <table className="table table-bordered color">
            <tbody>
              <tr>
                <td className="col-left">Student Reg No.</td>
                <td>
                  <input
                    type="text"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="col-left"></td>
                <td>
                  <button
                    type="button"
                    className="btn btn-1 btn-outline-secondary"
                    onClick={handleShowResult}
                  >
                    Show Result
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Search;
