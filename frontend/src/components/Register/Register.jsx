import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || 'Registration failed');
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
    <div className="register-page">
      <nav className="register-navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">🎙️</span>
          <span>VoiceFlow</span>
        </Link>
      </nav>

      <div className="register-wrapper">
        <div className="register-card">
          <h2>Create account</h2>
          <p className="register-subtitle">Sign up to start using VoiceFlow.</p>

          {error && <div className="register-error">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="register-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="register-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="register-field">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up →'}
            </button>
          </form>

          <p className="register-signin-text">
            Already have an account?{' '}
            <Link to="/login" className="register-signin-link">
              Sign in here
            </Link>
          </p>

          <Link to="/" className="register-back">← Back to home</Link>
        </div>
      </div>

      <footer className="register-footer">
        <p>VoiceFlow • Made for students who think faster than they type</p>
      </footer>
    </div>
  );
}