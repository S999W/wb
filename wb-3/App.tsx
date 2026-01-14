import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WritingSection from './components/WritingSection';
import MusicSection from './components/MusicSection';
import SocialsSection from './components/SocialsSection';
import WorkWithMePage from './components/WorkWithMePage';
import ThanksPage from './components/ThanksPage';

// Wrapper for the Home View
const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'home - steezy';
  }, []);

  return (
    <main className="space-y-12">
      <Hero />
      <WritingSection />
      <MusicSection />
      <SocialsSection />
    </main>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#1c1b1a] text-[#e9dfda] selection:bg-[#e9dfda] selection:text-[#1c1b1a]">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<main><WorkWithMePage /></main>} />
          <Route path="/thanks" element={<main><ThanksPage /></main>} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;