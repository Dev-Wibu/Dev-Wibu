import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Manage from './components/manage/Manage';
import './App.css'; // Import App.css

function App() {
  return (
    <div className="App">
      <Router>
        {/* Sử dụng component Navbar để hiển thị thanh điều hướng */}
        <Navbar />

        {/* Định tuyến các trang */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/1" element={<Home />} />
          <Route path="/2" element={<Home />} />
          <Route path="/3" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage" element={<Manage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
