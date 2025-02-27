import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import FirstPage from "../../components/Userpage/FirstPge";
import UserAnime from "../../components/Userpage/Useranime";

function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/login/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/login");
        }
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/login/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Failed to log out.");
    }
  };

  if (loading) return <p className="text-center text-secondary fs-5">Loading...</p>;
  
  return (
    <div>
      <DefaultLayout handleLogout={handleLogout} >
      <FirstPage user={user} handleLogout={handleLogout} />
      <UserAnime/>
      </DefaultLayout>
    </div>
  );
}

export default Home;
