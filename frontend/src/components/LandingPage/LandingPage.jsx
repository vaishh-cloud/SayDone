import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🎙️</span>
          <span>VoiceFlow</span>
        </div>
        
        <div className="nav-links">
          <Link to="/voice" className="nav-btn primary">
            Start Voice Input →
          </Link>
        </div>
      </nav>

      <main className="hero">
        <h1>Study Smarter with Your Voice</h1>
        <p className="subtitle">
          VoiceFlow helps students stay productive using natural voice commands — 
          no typing required.
        </p>

        <div className="features">
          <div className="feature-card">
            <h3>Voice Tasks</h3>
            <p>Add, edit, prioritize and complete tasks just by speaking</p>
          </div>
          
          <div className="feature-card">
            <h3>Pomodoro + Voice</h3>
            <p>Start/finish focus sessions and breaks with voice commands</p>
          </div>
          
          <div className="feature-card">
            <h3>Quick Notes</h3>
            <p>Capture lecture points, ideas, and reminders instantly</p>
          </div>
          
          <div className="feature-card">
            <h3>Daily Review</h3>
            <p>Get voice summary of what you accomplished today</p>
          </div>
        </div>

        <div className="cta-section">
          <Link to="/voice" className="big-cta-btn">
            Try Voice Input Now
          </Link>
          <p className="small-note">No login required for first use</p>
        </div>
      </main>

      <footer>
        <p>VoiceFlow • Made for students who think faster than they type</p>
      </footer>
    </div>
  );
}