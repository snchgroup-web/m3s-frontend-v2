import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Veuillez remplir tous les champs');
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setLocalError(result.error || 'Erreur de connexion');
    }
  };

  const demoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    const result = await login(demoEmail, demoPassword);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/assets/logo-new.png" alt="2SG Logo" className="w-20 h-20 rounded-full mx-auto mb-4" />
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
                Adresse Email
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

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-400 mb-3 text-center">Comptes de démonstration:</p>
            <div className="space-y-2">
              <button
                onClick={() => demoLogin('cheikh@seneswiss.sn', 'manager123')}
                disabled={loading}
                className="w-full text-left px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded transition text-slate-300 disabled:opacity-50"
              >
                <span className="font-medium text-blue-400">Cheikh</span> (Manager)
              </button>
              <button
                onClick={() => demoLogin('chantal@seneswiss.sn', 'finance123')}
                disabled={loading}
                className="w-full text-left px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded transition text-slate-300 disabled:opacity-50"
              >
                <span className="font-medium text-blue-400">Chantal</span> (Admin Finance)
              </button>
              <button
                onClick={() => demoLogin('pape@seneswiss.sn', 'admin123')}
                disabled={loading}
                className="w-full text-left px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded transition text-slate-300 disabled:opacity-50"
              >
                <span className="font-medium text-blue-400">Pape</span> (Administrateur)
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-slate-500 text-xs">
          <p>Accès sécurisé avec JWT</p>
          <p className="mt-1">API: europe-west6.run.app</p>
        </div>
      </div>
    </div>
  );
};

export default Login;