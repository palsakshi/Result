import React, { useState } from 'react';
import "../../components/admin/Dashboard/login.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../baseURL';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/login`, formData);
      console.log('Login success:', res.data);
      localStorage.setItem("token", JSON.stringify(res.data.token));

      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert(`Login failed: ${error?.response?.data?.error || 'Something went wrong'}`);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5 mb-4 mb-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>

              {/* Email */}
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="form-outline mb-3 position-relative">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control form-control-lg pe-5"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    top: '68%',
                    right: '15px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: '#6c757d'
                  }}
                />
              </div>

              {/* Remember Me */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-5"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
