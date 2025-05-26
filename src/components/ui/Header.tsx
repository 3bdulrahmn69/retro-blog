import { Link, useLocation, useNavigate } from 'react-router';
import Button from './Button';
import Container from './Container';
import { useAuth } from '../../context/AuthContext ';

interface HeaderProps {
  isLoaded: boolean;
  activeSection: number;
}

const Header = ({ isLoaded = true, activeSection }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  console.log(user?.name);

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
    <header
      className={`sticky top-0 z-50 bg-white border-b-4 border-amber-700 transition-all duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-8'
      }`}
    >
      <nav>
        <Container>
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 text-transparent bg-clip-text"
              >
                RETRO BLOG
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => handleSectionNavigation('home')}
                className={`px-3 py-2 cursor-pointer ${
                  activeSection === 0
                    ? 'text-amber-600 font-bold'
                    : 'text-amber-800'
                }`}
              >
                HOME
              </button>
              <button
                onClick={() => handleSectionNavigation('blog')}
                className={`px-3 py-2 cursor-pointer ${
                  activeSection === 1
                    ? 'text-amber-600 font-bold'
                    : 'text-amber-800'
                }`}
              >
                BLOG
              </button>
              <button
                onClick={() => handleSectionNavigation('about')}
                className={`px-3 py-2 cursor-pointer ${
                  activeSection === 2
                    ? 'text-amber-600 font-bold'
                    : 'text-amber-800'
                }`}
              >
                ABOUT
              </button>
              <button
                onClick={() => handleSectionNavigation('faq')}
                className={`px-3 py-2 cursor-pointer ${
                  activeSection === 3
                    ? 'text-amber-600 font-bold'
                    : 'text-amber-800'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => handleSectionNavigation('contact')}
                className={`px-3 py-2 cursor-pointer ${
                  activeSection === 4
                    ? 'text-amber-600 font-bold'
                    : 'text-amber-800'
                }`}
              >
                CONTACT
              </button>
              {isAuthenticated ? (
                <Button
                  variant="danger"
                  size="sm"
                  fullWidth={false}
                  onClick={logout}
                >
                  Logout
                </Button>
              ) : (
                <Link to="/auth/login">
                  <Button variant="primary" size="sm" fullWidth={false}>
                    LOGIN
                  </Button>
                </Link>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-amber-800">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
