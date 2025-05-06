import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import UsersPage from './pages/UsersPage';
import TradesPage from './pages/TradesPage';
import TraineesPage from './pages/TraineesPage';
import ModulesPage from './pages/ModulesPage';
import MarksPage from './pages/MarksPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/trades" element={<TradesPage />} />
            <Route path="/trainees" element={<TraineesPage />} />
            <Route path="/modules" element={<ModulesPage />} />
            <Route path="/marks" element={<MarksPage />} />
            <Route path="/" element={<div>Home Page - Select a form from the navbar</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;