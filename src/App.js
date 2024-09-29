import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './companents/LoginForm';
import Test from './companents/test';
import MainLayout from './companents/MainLayout';
import ProtectedRoute from './companents/ProtectedRoute';
import AuthRedirect from './companents/AuthRedirect';


function App() {
  return (
    <Router>
      <Routes>
        {/* Login sayfası */}
        <Route path="/login" element={<AuthRedirect><LoginForm /></AuthRedirect>} />
        {/* Ana sayfa */}
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout content={<Test />} /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
