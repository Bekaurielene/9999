import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './MainBlog.css'; 

function MainBlog() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated'); 

    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="main-container">
      <h1>Welcome to the Little Prince Community</h1>
      <nav>
        <Link to="/home" className="link-button">Home</Link>
        <div className="link-container">
          <Link to="/register" className="link-button">Register</Link>
          <Link to="/login" className="link-button">Login</Link>
        </div>
      </nav>
    </div>
  );
}

export default MainBlog;
