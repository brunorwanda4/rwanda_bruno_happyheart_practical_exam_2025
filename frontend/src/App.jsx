// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import AdminLayout from './pages/admin/admin_layout';
import AdminProtectedRoute from './components/AdminProtectedRoute'; // Import the protected route

const App = () => {
  return (
    // <AuthProvider> {/* If using Context API */}
    <BrowserRouter>
      <div className='min-h-screen'>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />

          <Route element={<AdminProtectedRoute />}>
            <Route path='/admin/*' element={<AdminLayout />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    // </AuthProvider>
  );
};

export default App;