// App.jsx (minimal version)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import VoiceInput from './components/VoiceInput/VoiceInput';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/voice" element={<VoiceInput />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;