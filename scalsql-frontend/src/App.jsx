import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import DatabaseConfig from './pages/DatabaseConfig';
import QueryGenerator from './pages/QueryGenerator';
import QueryResults from './pages/QueryResults';
import QueryHistory from './pages/QueryHistory';
import AdminPanel from './pages/AdminPanel';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="database" element={<DatabaseConfig />} />
            <Route path="query" element={<QueryGenerator />} />
            <Route path="results" element={<QueryResults />} />
            <Route path="history" element={<QueryHistory />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
