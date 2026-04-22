import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Dashboard from './Dashboard';
import Finance from './Finance';
import RH from './RH';
import Administration from './Administration';
import CRM from './CRM';
import Production from './Production';
import Actifs from './Actifs';
import GED from './GED';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* ÉTAPE 2 Routes */}
          <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
          <Route path="/rh" element={<ProtectedRoute><RH /></ProtectedRoute>} />
          <Route path="/administration" element={<ProtectedRoute><Administration /></ProtectedRoute>} />

          {/* ÉTAPE 3 Routes */}
          <Route path="/crm" element={<ProtectedRoute><CRM /></ProtectedRoute>} />
          <Route path="/production" element={<ProtectedRoute><Production /></ProtectedRoute>} />
          <Route path="/actifs" element={<ProtectedRoute><Actifs /></ProtectedRoute>} />
          <Route path="/ged" element={<ProtectedRoute><GED /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;