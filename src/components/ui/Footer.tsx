import { Link, useNavigate, useLocation } from 'react-router';
import Button from './Button';
import Container from './Container';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionNavigation = (sectionId: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="bg-amber-800 text-amber-100 py-8 border-t-4 border-amber-600">
      <Container>
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RETRO BLOG</h3>
            <p className="text-sm">
              A nostalgic journey through the digital ages. Blogging like it's
              1995!
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">NAVIGATION</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleSectionNavigation('home')}
                  className="hover:text-white cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionNavigation('blog')}
                  className="hover:text-white cursor-pointer text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionNavigation('about')}
                  className="hover:text-white cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionNavigation('faq')}
                  className="hover:text-white cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionNavigation('contact')}
                  className="hover:text-white cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">LEGAL</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">CONNECT</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/3bdulrahmn69"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/3bdulrahmn69"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.033-1.848-3.033-1.849 0-2.131 1.445-2.131 2.938v5.664H9.36V9h3.413v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.604 0 4.268 2.37 4.268 5.45v6.291zM5.337 7a2 2 0 110-4 2 2 0 010 4zm1.777 13.452H3.56V9h3.554v11.452z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/3bdulrahmn69"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <div className="mt-4">
              <Button
                size="sm"
                onClick={() => handleSectionNavigation('contact')}
              >
                CONTACT US
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-700 mt-8 pt-8 text-sm text-center">
          <p>
            ©{new Date().getFullYear()} Abdulrahman Moussa. All rights
            reserved.
          </p>
          <p className="mt-2">Made with 64KB of RAM and plenty of nostalgia.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
