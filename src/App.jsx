import React, { useState, useEffect } from 'react';
import { useMousePosition } from './hooks/useMousePosition';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import GitHubActivity from './components/GitHubActivity';
import Insights from './components/Insights';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mouse = useMousePosition();

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <>
      <div className="noise-overlay" />
      
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div style={{ position: 'relative' }}>
          {/* Global spotlight effect */}
          <div
            className="mouse-spotlight"
            style={{
              left: `${mouse.x}px`,
              top: `${mouse.y}px`,
              opacity: mouse.x > 0 ? 1 : 0
            }}
          />
          
          <Navbar />
          <main>
            <Hero mouse={mouse} />
            <About />
            <Achievements />
            <Skills />
            <Projects />
            <Experience />
            <GitHubActivity />
            <Insights />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
