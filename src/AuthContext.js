import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const readStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  if (!storedToken || storedToken.startsWith('demo_session_')) return storedToken;

  try {
    const encodedPayload = storedToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = encodedPayload.padEnd(Math.ceil(encodedPayload.length / 4) * 4, '=');
    const payload = JSON.parse(atob(paddedPayload));
    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.setItem('session_expired', 'true');
      return null;
    }
  } catch {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }

  return storedToken;
};

const readStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(readStoredToken);
  const [user, setUser] = useState(readStoredUser);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const demoAuthEnabled = process.env.REACT_APP_ENABLE_DEMO_AUTH === 'true';

  useEffect(() => {
    const handleExpiredSession = () => {
      setToken(null);
      setUser(null);
    };
    window.addEventListener('m3s:session-expired', handleExpiredSession);
    return () => window.removeEventListener('m3s:session-expired', handleExpiredSession);
  }, []);

  // Comptes de démonstration locaux, uniquement pour le développement.
  const demoAccounts = {
    'cheikh@seneswiss.sn': { password: 'manager123', name: 'Cheikh', role: 'Manager' },
    'chantal@seneswiss.sn': { password: 'finance123', name: 'Chantal', role: 'Admin Finance' },
    'pape@seneswiss.sn': { password: 'admin123', name: 'Pape', role: 'Administrateur' }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      if (!demoAuthEnabled) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          const message = result.error || 'Email ou mot de passe incorrect';
          setError(message);
          return { success: false, error: message };
        }

        setToken(result.token);
        setUser(result.user);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        return { success: true };
      }

      const account = demoAccounts[email];
      if (!account || account.password !== password) {
        const message = 'Email ou mot de passe incorrect';
        setError(message);
        return { success: false, error: message };
      }

      const fakeToken = `demo_session_${Date.now()}_${Math.random()}`;
      const sessionUser = {
        email,
        name: account.name,
        role: account.role
      };

      setToken(fakeToken);
      setUser(sessionUser);
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(sessionUser));

      return { success: true };
    } catch {
      const message = 'Erreur de connexion';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, error, loading, isAuthenticated, demoAuthEnabled }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'AuthProvider');
  }
  return context;
};
