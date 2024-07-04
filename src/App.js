import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainBlog from './components/MainBlog';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Detail from './components/Detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainBlog />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Detail />} /> {/* Add this for creating new blog */}
      </Routes>
    </Router>
  );
}

export default App;
