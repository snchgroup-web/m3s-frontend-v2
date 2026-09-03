import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const BudgetContext = createContext(null);

export const FinanceBudgetSession = ({ children }) => {
  const [draft, setDraft] = useState(null);
  const [exported, setExported] = useState(null);
  const [exportedAt, setExportedAt] = useState(null);
  const dirty = draft !== null && JSON.stringify(draft) !== exported;
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  return <BudgetContext.Provider value={{ draft, setDraft, exported, setExported, exportedAt, setExportedAt, dirty }}>{children}</BudgetContext.Provider>;
};

export const useFinanceBudget = () => useContext(BudgetContext);

export default function FinanceBudgetProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  // Changing or ending the authenticated session discards its in-memory draft before another user renders.
  return <FinanceBudgetSession key={isAuthenticated ? token : 'signed-out'}>{children}</FinanceBudgetSession>;
}
