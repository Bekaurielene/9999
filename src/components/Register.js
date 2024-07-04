import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();
    if (password.length < 4) {
      setMessage('Password must be at least 4 characters long.');
      return;
    }
    axios.post('https://apitest.reachstar.io/register', {
      email: email,
      password: password,
      name: name,
    }).then(function(response) {
      console.log(response.data);
      setMessage('Registration successful');
      navigate('/login');
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
              <h2 className="text-center mb-4">Registration</h2>
              <form method="post" onSubmit={register}>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    onChange={(event) => setName(event.target.value)}
                    className="form-control"
                    required
                  />
                </div>
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
                <button type="submit" className="btn btn-primary btn-block">Register</button>
                {message && <p className="mt-3">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;