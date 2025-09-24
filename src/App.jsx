import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './context/TranslationContext';
import Home from './pages/Home';
import SettingsPage from './pages/Settings';

function App() {
  return (
    <TranslationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </TranslationProvider>
  );
}

export default App;