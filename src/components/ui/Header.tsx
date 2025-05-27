import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import Button from './Button';
import Container from './Container';
import Input from './Input';
import { useAuth } from '../../context/AuthContext ';

interface HeaderProps {
  isLoaded: boolean;
  activeSection?: number;
}

const Header = ({ isLoaded = true, activeSection }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, logout } = useAuth();

  const isBlogPage = location.pathname === '/blog';

  // Initialize search query from URL params
  useEffect(() => {
    const urlSearchQuery = searchParams.get('search') || '';
    setSearchQuery(urlSearchQuery);
  }, [searchParams]);

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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to blog page with search query
      navigate(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      // If empty search, just go to blog page
      navigate('/blog');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b-4 border-amber-700 transition-all duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-8'
      }`}
    >
      <nav>
        <Container>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 text-transparent bg-clip-text"
              >
                RETRO BLOG
              </Link>
            </div>

            {/* Search Bar - Only on blog page and desktop */}
            {isBlogPage && (
              <div className="hidden lg:flex flex-1 max-w-lg mx-8">
                <Input
                  variant="search"
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search posts by title, content, or author..."
                  onSubmit={handleSearch}
                  submitButtonText="SEARCH"
                  className="w-full"
                />
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {!isBlogPage && (
                <>
                  <button
                    onClick={() => handleSectionNavigation('home')}
                    className={`px-3 py-2 cursor-pointer font-mono ${
                      activeSection === 0
                        ? 'text-amber-600 font-bold'
                        : 'text-amber-800 hover:text-amber-600'
                    }`}
                  >
                    HOME
                  </button>
                  <button
                    onClick={() => handleSectionNavigation('features')}
                    className={`px-3 py-2 cursor-pointer font-mono ${
                      activeSection === 1
                        ? 'text-amber-600 font-bold'
                        : 'text-amber-800 hover:text-amber-600'
                    }`}
                  >
                    FEATURES
                  </button>
                  <button
                    onClick={() => handleSectionNavigation('about')}
                    className={`px-3 py-2 cursor-pointer font-mono ${
                      activeSection === 2
                        ? 'text-amber-600 font-bold'
                        : 'text-amber-800 hover:text-amber-600'
                    }`}
                  >
                    ABOUT
                  </button>
                  <button
                    onClick={() => handleSectionNavigation('faq')}
                    className={`px-3 py-2 cursor-pointer font-mono ${
                      activeSection === 3
                        ? 'text-amber-600 font-bold'
                        : 'text-amber-800 hover:text-amber-600'
                    }`}
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => handleSectionNavigation('contact')}
                    className={`px-3 py-2 cursor-pointer font-mono ${
                      activeSection === 4
                        ? 'text-amber-600 font-bold'
                        : 'text-amber-800 hover:text-amber-600'
                    }`}
                  >
                    CONTACT
                  </button>
                </>
              )}

              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  {isBlogPage ? (
                    <Link to="/posts/create">
                      <Button variant="secondary" size="sm">
                        NEW POST
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/blog">
                      <Button variant="secondary" size="sm">
                        BLOG
                      </Button>
                    </Link>
                  )}
                  <Button variant="danger" size="sm" onClick={handleLogout}>
                    LOGOUT
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/auth/login">
                    <Button variant="primary" size="sm">
                      LOGIN
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-amber-800 hover:text-amber-600"
              >
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
                    d={
                      isMobileMenuOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Only on blog page */}
          {isBlogPage && (
            <div className="lg:hidden pb-4">
              <Input
                variant="search"
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search posts..."
                onSubmit={handleSearch}
                submitButtonText="SEARCH"
                className="w-full"
              />
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t-2 border-amber-600 bg-amber-50 px-4 py-4 space-y-3">
              {!isBlogPage && (
                <>
                  <button
                    onClick={() => {
                      handleSectionNavigation('home');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-amber-800 hover:text-amber-600 font-mono"
                  >
                    HOME
                  </button>
                  <button
                    onClick={() => {
                      handleSectionNavigation('features');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-amber-800 hover:text-amber-600 font-mono"
                  >
                    FEATURES
                  </button>
                  <button
                    onClick={() => {
                      handleSectionNavigation('about');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-amber-800 hover:text-amber-600 font-mono"
                  >
                    ABOUT
                  </button>
                  <button
                    onClick={() => {
                      handleSectionNavigation('faq');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-amber-800 hover:text-amber-600 font-mono"
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => {
                      handleSectionNavigation('contact');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-amber-800 hover:text-amber-600 font-mono"
                  >
                    CONTACT
                  </button>
                </>
              )}

              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/posts/create"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="secondary" size="sm" fullWidth>
                      NEW POST
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    fullWidth
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" size="sm" fullWidth>
                      LOGIN
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </Container>
      </nav>
    </header>
  );
};

export default Header;
