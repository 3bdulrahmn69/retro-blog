import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import Button from './Button';
import Container from './Container';
import Input from './Input';
import useAuth from '../../hooks/useAuth';

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
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 4,
        borderColor: 'primary.dark',
        boxShadow: 'none',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(-2rem)',
        transition: 'all 0.5s ease',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '64px !important',
          px: 0,
          '&.MuiToolbar-root': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
      >
        {/* Use the exact same Container as other pages */}
        <Container
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Logo */}
            <Box sx={{ flexShrink: 0 }}>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(to right, #fbbf24, #d97706)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textDecoration: 'none',
                  fontFamily: 'monospace',
                }}
              >
                RETRO BLOG
              </Typography>
            </Box>

            {/* Search Bar - Only on blog page and desktop */}
            {isBlogPage && (
              <Box
                sx={{
                  display: { xs: 'none', lg: 'flex' },
                  flex: 1,
                  maxWidth: '512px',
                  mx: 4,
                }}
              >
                <Input
                  variant="search"
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search posts by title, content, or author..."
                  onSubmit={handleSearch}
                  submitButtonText="SEARCH"
                  sx={{ width: '100%' }}
                />
              </Box>
            )}

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 2,
                ml: 'auto',
              }}
            >
              {!isBlogPage && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {Object.values({
                    0: 'HOME',
                    1: 'FEATURES',
                    2: 'ABOUT',
                    3: 'FAQ',
                    4: 'CONTACT',
                  }).map((label, index) => (
                    <Box
                      key={index}
                      component="button"
                      onClick={() =>
                        handleSectionNavigation(label.toLowerCase())
                      }
                      sx={{
                        px: 1.5,
                        py: 1,
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        color:
                          activeSection === index
                            ? 'primary.main'
                            : 'primary.dark',
                        fontWeight: activeSection === index ? 700 : 400,
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {label}
                    </Box>
                  ))}
                </Box>
              )}

              {isAuthenticated ? (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {isBlogPage ? (
                    <Link to="/posts/create" style={{ textDecoration: 'none' }}>
                      <Button variant="secondary" size="sm">
                        NEW POST
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/blog" style={{ textDecoration: 'none' }}>
                      <Button variant="secondary" size="sm">
                        BLOG
                      </Button>
                    </Link>
                  )}
                  <Button variant="danger" size="sm" onClick={handleLogout}>
                    LOGOUT
                  </Button>
                </Box>
              ) : (
                <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                  <Button variant="primary" size="sm">
                    LOGIN
                  </Button>
                </Link>
              )}
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton
                onClick={toggleMobileMenu}
                sx={{
                  color: 'primary.dark',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Toolbar>

      {/* Mobile Search Bar - Only on blog page */}
      {isBlogPage && (
        <Collapse in={true}>
          <Container>
            <Box sx={{ display: { xs: 'block', lg: 'none' }, pb: 2 }}>
              <Input
                variant="search"
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search posts..."
                onSubmit={handleSearch}
                submitButtonText="SEARCH"
                sx={{ width: '100%' }}
              />
            </Box>
          </Container>
        </Collapse>
      )}

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="top"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            borderTop: 2,
            borderColor: 'primary.main',
            backgroundColor: 'primary.light',
            mt: '64px',
          },
        }}
      >
        <Container>
          <Box sx={{ py: 2 }}>
            {!isBlogPage && (
              <List>
                {Object.values({
                  0: 'HOME',
                  1: 'FEATURES',
                  2: 'ABOUT',
                  3: 'FAQ',
                  4: 'CONTACT',
                }).map((label) => (
                  <ListItem key={label} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleSectionNavigation(label.toLowerCase());
                        setIsMobileMenuOpen(false);
                      }}
                      sx={{
                        color: 'primary.dark',
                        fontFamily: 'monospace',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}

            <Box
              sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              {isAuthenticated ? (
                <>
                  <Link
                    to="/posts/create"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ textDecoration: 'none' }}
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
                </>
              ) : (
                <Link
                  to="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="outline" size="sm" fullWidth>
                    LOGIN
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
        </Container>
      </Drawer>
    </AppBar>
  );
};

export default Header;
