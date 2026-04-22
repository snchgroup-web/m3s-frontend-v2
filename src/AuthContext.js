import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Comptes de démo locaux
  const demoAccounts = {
    'cheikh@seneswiss.sn': { password: 'manager123', name: 'Cheikh', role: 'Manager' },
    'chantal@seneswiss.sn': { password: 'finance123', name: 'Chantal', role: 'Admin Finance' },
    'pape@seneswiss.sn': { password: 'admin123', name: 'Pape', role: 'Administrateur' }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      // Vérifier les comptes de démo localement
      if (demoAccounts[email] && demoAccounts[email].password === password) {
        const account = demoAccounts[email];
        const fakeToken = `fake_jwt_${Date.now()}_${Math.random()}`;
        
        setToken(fakeToken);
        localStorage.setItem('token', fakeToken);
        setUser({
          email,
          name: account.name,
          role: account.role
        });

        return { success: true };
      } else {
        setError('Email ou mot de passe incorrect');
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }
    } catch (err) {
      setError('Erreur de connexion');
      return { success: false, error: 'Erreur de connexion' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, error, loading, isAuthenticated }}>
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