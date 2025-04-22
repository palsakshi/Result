
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import baseURL from "../../../baseURL";


function Count() {
    const [totalStudents, setTotalStudents] = useState(0);
    

    useEffect(()=>{
   axios.get(`${baseURL}/api/record`)
   .then((res)=>{
    setTotalStudents(res.data)
   }).catch((err)=>{
    console.log("Error fetching student record", err);
   });

    }, [])
  return (
   
    <div className="container mt-5  " style={{display:'flex', alignItems:"center", justifyContent:'center', flexDirection:'column'}}>
      <h2>📊 Record</h2>
      <div className="card p-4 mt-4 shadow-sm  " style={{width:'50%', height:'50%', textAlign: 'center'}}>
        <h4>Total Students: </h4>
        <h3>{totalStudents}</h3>
      </div>
    </div>
  )
}

export default Count;
