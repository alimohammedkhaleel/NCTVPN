import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Presentation from './components/Presentation';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import CustomCursor from './components/effects/CustomCursor';
import ClickSpark from './components/effects/ClickSpark';
import SplashCursor from './components/effects/SplashCursor';
import GlobalAirplane from './components/effects/GlobalAirplane';
import Footer from './components/Footer';

function App() {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    if (showApp) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
  }, [showApp]);

  return (
    <Router>
      <div className="App">
        <SplashCursor />
        <CustomCursor />
        <ClickSpark />
        {!showApp ? (
          <Presentation onFinish={() => setShowApp(true)} />
        ) : (
          <>
            <Navbar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
