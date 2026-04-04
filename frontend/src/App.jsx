// App.jsx (minimal version)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import VoiceInput from './components/VoiceInput/VoiceInput';
import Register from './components/Register/Register';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token'); // ← use token now
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/voice" 
          element={
            <PrivateRoute>
              <VoiceInput />
            </PrivateRoute>
          } 
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;