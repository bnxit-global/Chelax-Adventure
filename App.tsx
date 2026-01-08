import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  return (
    <div id="main-content" className="bg-white min-h-screen scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <AboutSection />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default App;