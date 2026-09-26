import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Eye, EyeOff, LockKeyhole, LogIn, Mail, Sun, Moon, Eclipse, ArrowLeft } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import LoginClock from './login/LoginClock';
import { loginMessages } from './login/messages';

export function loginDestination(next) {
  return typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') &&
    !next.includes('\\') && ![...next].some(char => char.charCodeAt(0) < 32) ? next : '/';
}

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, loginDemo, loading, demoAuthEnabled, demoAccounts = [], isAuthenticated,
    ready, provider, verifyMfa, cancelMfa, recoverPassword } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = loginMessages[language] || loginMessages.FR;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [mfa, setMfa] = useState(false);
  const [code, setCode] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [sessionExpired] = useState(() => searchParams.get('session') === 'expired' || localStorage.getItem('session_expired') === 'true');
  const [logoutSuccess] = useState(() => sessionStorage.getItem('logout_success') === 'true');
  const disabled = loading || busy || ready === false;
  const year = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'Europe/Zurich' }).format(new Date());

  useEffect(() => {
    if (sessionExpired) localStorage.removeItem('session_expired');
    if (logoutSuccess) sessionStorage.removeItem('logout_success');
  }, [sessionExpired, logoutSuccess]);

  async function submit(event) {
    event.preventDefault();
    if (disabled || pending.current) return;
    const form = event.currentTarget;
    if (mfa) {
      if (!/^\d{6}$/.test(code)) { setError({ field: 'code', key: 'invalidCode' }); return; }
      pending.current = true; setBusy(true); setError(null); setCode('');
      try {
        const result = await verifyMfa(code);
        if (result.success) navigate(loginDestination(searchParams.get('next')));
        else setError({ key: result.code === 'auth/too-many-requests' ? 'tooMany' : 'mfaFailed' });
      } catch { setError({ key: 'mfaFailed' }); }
      finally { pending.current = false; setBusy(false); }
      return;
    }
    const emailInput = form.elements.namedItem('email');
    const passwordInput = form.elements.namedItem('password');
    let invalid = null;
    if (!email.trim()) invalid = { field: 'email', key: 'required' };
    else if (!emailInput.validity.valid) invalid = { field: 'email', key: 'invalidEmail' };
    else if (!password) invalid = { field: 'password', key: 'required' };
    if (invalid) {
      setError(invalid);
      (invalid.field === 'email' ? emailInput : passwordInput).focus();
      return;
    }
    pending.current = true;
    setBusy(true); setError(null); setVisible(false); setPassword('');
    try {
      const result = await login(email.trim(), password, language.toLowerCase());
      if (result.success) navigate(loginDestination(searchParams.get('next')));
      else if (result.mfaRequired) { setMfa(true); setHelpOpen(false); }
      else setError({ key: result.code === 'auth/too-many-requests' ? 'tooMany' : 'failed' });
    } catch { setError({ key: 'failed' }); }
    finally { pending.current = false; setBusy(false); }
  }

  async function recover() {
    if (disabled || pending.current || recoverySent) return;
    const input = document.getElementById('login-email');
    if (!email.trim() || !input?.validity.valid) {
      setError({ field: 'email', key: 'invalidEmail' }); input?.focus(); return;
    }
    pending.current = true; setBusy(true); setError(null);
    try { await recoverPassword(email.trim(), language.toLowerCase()); setRecoverySent(true); }
    catch { setError({ key: 'recoveryFailed' }); }
    finally { pending.current = false; setBusy(false); }
  }

  async function demoLogin(account) {
    if (disabled || pending.current) return;
    pending.current = true; setBusy(true); setError(null); setPassword(''); setVisible(false);
    try {
      const result = await loginDemo(account.email);
      if (result.success) navigate(loginDestination(searchParams.get('next')));
      else setError({ key: 'failed' });
    } catch { setError({ key: 'failed' }); }
    finally { pending.current = false; setBusy(false); }
  }

  const fieldProps = field => ({ 'aria-invalid': error?.field === field || undefined,
    'aria-describedby': error?.field === field ? 'login-error' : undefined });
  const visibilityLabel = visible ? t.hidePassword : t.showPassword;
  const VisibilityIcon = visible ? EyeOff : Eye;
  return <div className="access-login" lang={{ FR: 'fr', DE: 'de', EN: 'en' }[language] || 'fr'}>
    <header className="access-login-header">
      <div className="access-login-brand"><img src="/assets/logo-2sg.png" alt="2SG SeneSwiss Group"/>
        <div><strong>{t.title}</strong><span>SENESWISS GROUP</span></div></div>
      <div className="access-login-preferences">
        <select aria-label={t.language} value={loginMessages[language] ? language : 'FR'} onChange={e => setLanguage(e.target.value)}>
          <option value="FR">FR</option><option value="EN">EN</option><option value="DE">DE</option>
        </select>
        <div role="group" aria-label={t.theme}>{[['light', Sun], ['standard', Moon], ['deep', Eclipse]].map(([key, Icon]) =>
          <button type="button" key={key} title={t[key]} aria-label={t[key]} aria-pressed={theme === key} onClick={() => setTheme(key)}><Icon size={19} aria-hidden="true"/></button>)}</div>
      </div>
    </header>
    <LoginClock language={language}/>
    <main className="access-login-main">
      <h1>{mfa ? t.mfa : t.login}</h1>
      {error && <p id="login-error" className="access-login-alert" role="alert"><AlertCircle size={20} aria-hidden="true"/>{t[error.key]}</p>}
      {!error && logoutSuccess && <p className="access-login-notice" role="status"><CheckCircle2 size={20} aria-hidden="true"/>{t.loggedOut}</p>}
      {!error && sessionExpired && !logoutSuccess && <p className="access-login-alert" role="status"><AlertCircle size={20} aria-hidden="true"/>{t.expired}</p>}
      <form noValidate onSubmit={submit}>
        <fieldset disabled={disabled}>
          {mfa ? <>
            <label htmlFor="login-code">{t.code}</label>
            <div className="access-login-field"><LockKeyhole size={20} aria-hidden="true"/>
              <input id="login-code" name="code" type="text" inputMode="numeric" autoComplete="one-time-code"
                maxLength={6} pattern="[0-9]{6}" autoFocus value={code}
                onChange={e => { setCode(e.target.value.replace(/\D/g, '')); setError(null); }} {...fieldProps('code')}/></div>
          </> : <>
          <label htmlFor="login-email">{t.email}</label>
          <div className="access-login-field"><Mail size={20} aria-hidden="true"/>
            <input id="login-email" name="email" type="email" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck="false" required maxLength={254}
              value={email} onChange={e => { setEmail(e.target.value); setError(null); }} {...fieldProps('email')}/></div>
          <label htmlFor="login-password">{t.password}</label>
          <div className="access-login-field access-login-password" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setVisible(false); }}>
            <LockKeyhole size={20} aria-hidden="true"/>
            <input id="login-password" name="password" type={visible ? 'text' : 'password'} autoComplete="current-password" required
              value={password} onChange={e => { setPassword(e.target.value); setError(null); }} {...fieldProps('password')}/>
            <button type="button" className="access-login-eye" title={visibilityLabel} aria-label={visibilityLabel} aria-controls="login-password" aria-pressed={visible} onClick={() => setVisible(value => !value)}><VisibilityIcon size={21} aria-hidden="true"/></button>
          </div>
          </>}
          <button type="submit" className="access-login-submit"><LogIn size={20} aria-hidden="true"/>{disabled ? t.wait : mfa ? t.verify : t.submit}</button>
        </fieldset>
      </form>
      {mfa ? <button type="button" disabled={disabled} className="access-login-link" onClick={async () => {
        await cancelMfa(); setMfa(false); setCode(''); setError(null);
      }}>{t.back}</button> : <button type="button" className="access-login-link" aria-expanded={helpOpen} aria-controls="login-recovery-help" onClick={() => setHelpOpen(value => !value)}>{t.forgot}</button>}
      {helpOpen && <section id="login-recovery-help" className="access-login-help" aria-labelledby="login-recovery-title">
        <h2 id="login-recovery-title">{t.recovery}</h2>
        {provider === 'google' ? <>
          {recoverySent ? <p role="status">{t.recoverySent}</p> :
            <button type="button" className="access-login-submit" disabled={disabled} onClick={recover}><Mail size={20} aria-hidden="true"/>{t.sendRecovery}</button>}
        </> : <p>{t.recoveryPending}</p>}<p>{t.keepPrivate}</p>
      </section>}
      {isAuthenticated && <button type="button" className="access-login-link access-login-return" onClick={() => navigate('/account')}><ArrowLeft size={17} aria-hidden="true"/>{t.account}</button>}
      {demoAuthEnabled && <section className="access-login-demo"><h2>{t.demo}</h2>{demoAccounts.map(account =>
        <button type="button" key={account.email} disabled={disabled} onClick={() => demoLogin(account)}>{account.name} ({account.role})</button>)}</section>}
    </main>
    <footer className="access-login-footer">
      <div className="access-login-legal">
        {[['legal', t.legalText], ['privacy', t.privacyText], ['terms', t.termsText]].map(([key, text]) =>
          <details key={key}><summary>{t[key]}</summary><p>{text}</p></details>)}
      </div>
      <p>M3S ERP v2.0 · © {year} SENESWISS GROUP</p>
      <address>{t.address}</address>
    </footer>
  </div>;
}
