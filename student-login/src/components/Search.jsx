import React from "react";
// import logo '../assets/img/logo.png';

import myLogo from '../assets/img/logo.jpg';
const Search=()=> {
    return(
        <>
        <div className='main_head d-flex justify-content-center align-items-center flex-column'>
            <div className="img_div">
                <img src={myLogo} alt="logo text"  />
            </div>

            <div className="filed">
                <h2>Results</h2>
                
                <table className="table table-bordered color ">
                
                    <tbody>
                        <tr>
                            <td className="col-left">Student Reg No.</td>
                            <td><input type="text" /></td>
                        </tr>
                        <tr>
                            <td className="col-left"></td>
                            <td><button type="button" className="btn btn-1 btn-outline-secondary">Show Result</button></td>
                        </tr>
                    </tbody>
                
                </table>

            </div>
        </div>
        </>
    ) 
};
export default Search;