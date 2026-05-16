import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout';
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
        <LanguageProvider>
          <ThemeProvider>
            <Routes>
            <Route path="/login" element={<Login />} />

            {/* Routes avec Layout (sidebar sur toutes les pages) */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* ÉTAPE 2 Routes */}
            <Route
              path="/finance"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Finance />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rh"
              element={
                <ProtectedRoute>
                  <Layout>
                    <RH />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/administration"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Administration />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* ÉTAPE 3 Routes */}
            <Route
              path="/crm"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CRM />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/production"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Production />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/actifs"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Actifs />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/ged"
              element={
                <ProtectedRoute>
                  <Layout>
                    <GED />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;