import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import FirstPage from "../../components/Userpage/FirstPge";
import UserAnime from "../../components/Userpage/Useranime";
import ChatLauncher from "../../components/Userpage/ChatLauncher/ChatLauncher";

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
  
    axios.get("http://127.0.0.1:8000/api/login/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setUser(response.data.user);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      if (error.response?.status === 403 || error.response?.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Failed to fetch user data");
      }
    });
  }, [navigate]);
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
  
      // Attempt logout but don't block if it fails
      await axios.post(
        "http://127.0.0.1:8000/api/login/logout",
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      ).catch(() => {}); // Silently catch logout errors
  
      // Always clear local storage and redirect
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout failed, clear local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  if (loading) return <p className="text-center text-secondary fs-5">Loading...</p>;
  
  return (
    <div>
      <DefaultLayout handleLogout={handleLogout} >
        <FirstPage user={user} handleLogout={handleLogout} />
        <UserAnime/>
        <ChatLauncher/>
      </DefaultLayout>
    </div>
  );
}

export default Home;