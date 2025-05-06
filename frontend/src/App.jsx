import React from 'react';
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import AdminLayout from './pages/admin/admin_layout';

const App = () => {
  return (
    <BrowserRouter >
      <div className=' min-h-screen'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/admin/*' element={<AdminLayout />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;