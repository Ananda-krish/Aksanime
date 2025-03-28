import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const resendVerificationEmail = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/email/resend", 
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("Verification email sent!");
    } catch (error) {
      setError("Could not send verification email.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Email Verification Required</div>
        <div className="card-body">
          <h5 className="card-title">Please Verify Your Email</h5>
          <p className="card-text">
            You need to verify your email address before accessing the dashboard.
            Please check your inbox for a verification link.
          </p>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="d-flex justify-content-between">
            <button 
              onClick={resendVerificationEmail} 
              className="btn btn-primary"
            >
              Resend Verification Email
            </button>
            <button 
              onClick={handleLogout} 
              className="btn btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;