import React from 'react';
import HomePage from './pages/Home';
import MapPage from './pages/MapPage';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/Login';
import UserLogin from './pages/User/Login';
import UserSettings from './pages/User/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
    </Router>
  );
}

export default App;