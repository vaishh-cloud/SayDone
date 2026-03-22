import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Link } from 'react-router-dom';
import './VoiceInput.css';

export default function VoiceInput() {
  const {
    transcript,
    interimTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [manualNote, setManualNote] = useState('');

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    resetTranscript();
    setManualNote('');
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="voice-page">
        <h2>Your browser does not support speech recognition 😔</h2>
        <p>Try Chrome, Edge or Opera (desktop/mobile)</p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  if (!isMicrophoneAvailable) {
    return (
      <div className="voice-page">
        <h2>Microphone access denied or not available</h2>
        <p>Please allow microphone permission in your browser settings.</p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="voice-page">
      <header className="voice-header">
        <h1>Voice Input</h1>
        <Link to="/" className="back-link">← Home</Link>
      </header>

      <main className="voice-main">
        <div className={`mic-status ${listening ? 'active' : ''}`}>
          {listening ? '🎤 Listening...' : 'Ready to record'}
        </div>

        <div className="controls">
          <button
            onClick={startListening}
            disabled={listening}
            className="btn start-btn"
          >
            Start Recording
          </button>

          <button
            onClick={stopListening}
            disabled={!listening}
            className="btn stop-btn"
          >
            Stop
          </button>

          <button onClick={handleReset} className="btn reset-btn">
            Clear
          </button>
        </div>

        <div className="transcript-box">
          <h3>Live Transcript</h3>
          <div className="transcript-content">
            {transcript || interimTranscript ? (
              <>
                {transcript}
                <span className="interim">{interimTranscript}</span>
              </>
            ) : (
              <span className="placeholder">Speak something...</span>
            )}
          </div>
        </div>

        <div className="manual-section">
          <h3>Or type manually</h3>
          <textarea
            value={manualNote}
            onChange={(e) => setManualNote(e.target.value)}
            placeholder="You can also type here if you prefer..."
            rows={4}
          />
        </div>
      </main>

      <footer className="voice-footer">
        <p>VoiceFlow — Student Productivity with Voice</p>
      </footer>
    </div>
  );
}