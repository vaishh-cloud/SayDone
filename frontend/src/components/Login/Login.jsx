import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.access_token);
      navigate('/voice');

    } catch (err) {
      setError('Could not connect to server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <nav className="login-navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">🎙️</span>
          <span>VoiceFlow</span>
        </Link>
      </nav>

      <div className="login-wrapper">
        <div className="login-card">
          <h2>Welcome back</h2>
          <p className="login-subtitle">Log in to access your voice workspace.</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="login-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In →'}
            </button>
          </form>

          {/* ↓ New signup link */}
          <p className="login-signup-text">
            New account?{' '}
            <Link to="/register" className="login-signup-link">
              Sign up here
            </Link>
          </p>

          <Link to="/" className="login-back">← Back to home</Link>
        </div>
      </div>

      <footer className="login-footer">
        <p>VoiceFlow • Made for students who think faster than they type</p>
      </footer>
    </div>
  );
}