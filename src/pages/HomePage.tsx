import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

/* sections */
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import FaqSection from '../components/sections/FaqSection';
import CtaSection from '../components/sections/CtaSection';
import DeveloperSection from '../components/sections/DeveloperSection';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Define the scroll handler function
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 0;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
          current = index;
        }
      });

      setActiveSection(current);
    };

    // Call it once immediately to detect initial position
    handleScroll();

    // Then add the event listener for future scrolling
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation to specific sections when the page loads with a #
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);

      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && activeSection === 0) {
        navigate('/blog');
      }
    };

    window.addEventListener('keydown', handleEnterPress);

    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [navigate, activeSection]);

  return (
    <div className="min-h-screen bg-amber-50 font-mono">
      {/* Header */}
      <Header isLoaded={isLoaded} activeSection={activeSection} />

      {/* Hero Section */}
      <HeroSection isLoaded={isLoaded} />

      {/* Features Section */}
      <FeaturesSection isLoaded={isLoaded} />

      {/* About Section */}
      <AboutSection activeSection={activeSection} />

      {/* FAQ Section */}
      <FaqSection activeSection={activeSection} />

      {/* Contact Section */}
      <ContactSection activeSection={activeSection} />

      {/* Call to Action Section */}
      <CtaSection />

      {/* Developer Section */}
      <DeveloperSection activeSection={activeSection} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
