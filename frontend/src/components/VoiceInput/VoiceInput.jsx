import React, { useState } from "react";

const VoiceInput = () => {
  const [text, setText] = useState("");

  const handleVoice = () => {
    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recog = new recognition();

    recog.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recog.start();
  };

  return (
    <div className="container">
      <h2>🎤 Voice Input</h2>

      <button className="button" onClick={handleVoice}>
        Start Speaking
      </button>

      <div className="card">
        <p>{text || "Say something..."}</p>
      </div>
    </div>
  );
};

export default VoiceInput;