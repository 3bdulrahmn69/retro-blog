import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import Button from '../components/ui/Button';
import { faqItems } from '../lib/faqItems';
import Section, { Title } from '../components/ui/Section';
import Container from '../components/ui/Container';
import Footer from '../components/ui/Footer';
import Header from '../components/ui/Header';
import DeveloperSection from '../components/sections/DeveloperSection';
import RetroTerminal from '../components/ui/RetroTerminal';

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
      <Section
        id="home"
        className={`py-20 transition-all duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}
      >
        <Container>
          <div className="bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)]">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 text-center font-bold border-b-4 border-amber-700">
              <h1 className="text-2xl md:text-4xl tracking-wider">
                WELCOME TO RETRO BLOG
              </h1>
            </div>
            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-amber-800">
                  A Journey Back in Digital Time
                </h2>
                <p className="text-amber-700">
                  Experience the nostalgic charm of vintage computing with our
                  retro-themed blog platform. Share your thoughts with the
                  aesthetic of yesteryear.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/auth/register" className="flex-1">
                    <Button>JOIN NOW</Button>
                  </Link>
                  <Link to="/blog" className="flex-1">
                    <Button variant="secondary">READ BLOG</Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <RetroTerminal title="retro-terminal">
                  <p>{'>'} Welcome to Retro Blog</p>
                  <p>{'>'} The year is 2025</p>
                  <p>{'>'} But the aesthetic is 1995</p>
                  <p>{'>'} Loading nostalgia...</p>
                  <p className="mt-4 animate-pulse">
                    {'>'} Press Enter key to continue_
                  </p>
                </RetroTerminal>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Introduction Section */}
      <Section id="features">
        <Container>
          <Title>WHAT WE OFFER</Title>
          <div className="grid md:grid-cols-3 gap-6">
            <div
              className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-500 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 font-bold border-b-4 border-amber-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Nostalgic Blogging</span>
                  <span className="text-xs bg-amber-100 px-2 py-1 rounded">
                    Core Feature
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-amber-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2 text-center">
                  Express Yourself
                </h3>
                <p className="text-amber-700 mb-4">
                  Create and share your thoughts with our retro-styled blogging
                  platform. Enjoy a blast from the past with every post you
                  write.
                </p>
                <Link to="/features/blogging">
                  <Button variant="outline" size="sm">
                    LEARN MORE
                  </Button>
                </Link>
              </div>
            </div>

            <div
              className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-500 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '250ms' }}
            >
              <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 font-bold border-b-4 border-amber-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Retro Community</span>
                  <span className="text-xs bg-amber-100 px-2 py-1 rounded">
                    Popular
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-amber-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2 text-center">
                  Join Fellow Enthusiasts
                </h3>
                <p className="text-amber-700 mb-4">
                  Connect with like-minded retro fans. Comment on posts, share
                  ideas, and relive the digital nostalgia together.
                </p>
                <Link to="/features/community">
                  <Button variant="outline" size="sm">
                    LEARN MORE
                  </Button>
                </Link>
              </div>
            </div>

            <div
              className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-500 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 font-bold border-b-4 border-amber-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Vintage Resources</span>
                  <span className="text-xs bg-amber-100 px-2 py-1 rounded">
                    Exclusive
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-amber-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2 text-center">
                  Digital Time Capsule
                </h3>
                <p className="text-amber-700 mb-4">
                  Access our collection of retro tech resources, pixel art
                  galleries, and vintage design inspiration for your creative
                  projects.
                </p>
                <Link to="/features/resources">
                  <Button variant="outline" size="sm">
                    LEARN MORE
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link to="/blog">
              <Button variant="secondary" fullWidth={false} className="px-8">
                EXPLORE THE BLOG
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* About Section */}
      <Section id="about" className=" bg-amber-100">
        <Container>
          <div
            className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-700 ${
              activeSection >= 2
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 text-center font-bold border-b-4 border-amber-700">
              <h2 className="text-2xl tracking-wider">ABOUT RETRO BLOG</h2>
            </div>
            <div className="p-6 md:p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-amber-800">
                  Nostalgia-Driven Blogging
                </h3>
                <p className="text-amber-700">
                  Retro Blog was founded in 2025 by a group of tech enthusiasts
                  who missed the aesthetic charm of early computing. Our
                  platform combines the visual appeal of 80s and 90s interfaces
                  with modern functionality.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-amber-50 p-4 border-l-4 border-amber-500">
                    <h4 className="text-lg font-bold text-amber-800 mb-2">
                      Retro Design
                    </h4>
                    <p className="text-amber-700">
                      We embrace chunky borders, vibrant gradients, and
                      pixelated charm.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 border-l-4 border-amber-500">
                    <h4 className="text-lg font-bold text-amber-800 mb-2">
                      Modern Tech
                    </h4>
                    <p className="text-amber-700">
                      Built with React and TypeScript for a smooth experience.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 border-l-4 border-amber-500">
                    <h4 className="text-lg font-bold text-amber-800 mb-2">
                      Community Focus
                    </h4>
                    <p className="text-amber-700">
                      A platform for sharing knowledge with fellow retro
                      enthusiasts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section id="faq">
        <Container>
          <Title>FREQUENTLY ASKED QUESTIONS</Title>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-500 ${
                  activeSection >= 3
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 font-bold border-b-4 border-amber-700">
                  <h3 className="text-lg">{item.question}</h3>
                </div>
                <div className="p-4 bg-amber-50">
                  <p className="text-amber-700">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-amber-100">
        <Container>
          <div
            className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-700 ${
              activeSection >= 4
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 text-center font-bold border-b-4 border-amber-700">
              <h3 className="text-2xl tracking-wider">CONTACT US</h3>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-amber-800">
                    Send Us a Message
                  </h4>
                  <p className="text-amber-700">
                    Have questions or suggestions? Drop us a line and we'll get
                    back to you as soon as our dial-up connection allows.
                  </p>

                  <div className="bg-amber-50 p-4 border-l-4 border-amber-500">
                    <h5 className="text-lg font-bold text-amber-800 mb-2">
                      Office Hours
                    </h5>
                    <p className="text-amber-700">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                    <p className="text-amber-700">
                      Weekends: Closed (Our computers need rest too)
                    </p>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    ></textarea>
                  </div>

                  <a href="https://3bdulrahmn.vercel.app/#contact">
                    <Button type="button">SEND MESSAGE</Button>
                  </a>

                  <p className="text-xs text-amber-700 mt-2">
                    * Messages are delivered via virtual floppy disk. Please
                    allow 24-48 hours for response.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Call to Action Section */}
      <Section id="CTA">
        <Container>
          <div className="bg-amber-800 text-amber-100 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">
              JOIN THE RETRO REVOLUTION
            </h2>
            <p className="mb-6">
              Become part of our community and share your passion for retro
              computing.
            </p>
            <Link to="/auth/register">
              <Button>GET STARTED</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Developer Section */}
      <DeveloperSection activeSection={activeSection} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
