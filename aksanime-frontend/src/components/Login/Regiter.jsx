import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    about: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Registration successful! Redirecting to email verification...");

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        setError(errorMessages.join(", "));
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="shadow card">
            <div className="p-4 card-body">
              <h2 className="mb-4 text-center">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm_password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm_password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone_number" className="form-label">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="about" className="form-label">
                    About (Optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Profile Image (Optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </div>
                <button
                  type="submit"
                  className="mb-3 btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
                <div className="text-center">
                  Already have an account? <Link to="/login">Login here</Link>
                </div>
              </form>
              {error && <div className="mt-3 alert alert-danger">{error}</div>}
              {success && <div className="mt-3 alert alert-success">{success}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;