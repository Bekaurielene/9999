import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    if (password.length < 4) {
      setMessage('Password must be at least 4 characters long.');
      return;
    }
    axios.post('https://apitest.reachstar.io/signin', {
      email: email,
      password: password,
    }).then(function(response) {
      console.log(response.data);
      setMessage('Login successful');
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    }).catch(function(error) {
      console.log(error);
      setMessage('An error occurred. Please try again.');
    });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form method="post" onSubmit={login}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={4} 
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                {message && <p className="mt-3">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;