import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Lock, Mail } from 'lucide-react';
import { useAuth } from './AuthContext';

const demoAccounts = [
  { email: 'cheikh@seneswiss.sn', password: 'manager123', name: 'Cheikh', role: 'Manager' },
  { email: 'chantal@seneswiss.sn', password: 'finance123', name: 'Chantal', role: 'Admin Finance' },
  { email: 'pape@seneswiss.sn', password: 'admin123', name: 'Pape', role: 'Administrateur' }
];

const Login = () => {
  const navigate = useNavigate();
  const { login, error, loading, demoAuthEnabled } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const submitLogin = async (loginEmail, loginPassword) => {
    const result = await login(loginEmail, loginPassword);

    if (result.success) {
      navigate('/');
    } else {
      setLocalError(result.error || 'Erreur de connexion');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Veuillez remplir tous les champs');
      return;
    }

    await submitLogin(email, password);
  };

  const demoLogin = async (account) => {
    setLocalError('');
    setEmail(account.email);
    setPassword(account.password);
    await submitLogin(account.email, account.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-4">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">M3S v2.0</h1>
          <p className="text-slate-400">ERP Hybride - SENESWISS GROUP</p>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">Connexion</h2>

          {(error || localError) && (
            <div className="mb-4 p-4 bg-red-900 border border-red-700 rounded flex items-start space-x-3">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error || localError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {demoAuthEnabled ? (
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-xs text-slate-400 mb-3 text-center">Comptes de démonstration locaux :</p>
              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => demoLogin(account)}
                    disabled={loading}
                    className="w-full text-left px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded transition text-slate-300 disabled:opacity-50"
                  >
                    <span className="font-medium text-blue-400">{account.name}</span> ({account.role})
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-xs text-amber-300 text-center">
                Connexion backend requise. Le mode démonstration local est désactivé.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-slate-500 text-xs">
          <p>{demoAuthEnabled ? 'Mode démonstration local' : 'Accès sécurisé par backend'}</p>
          <p className="mt-1">API: {process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
