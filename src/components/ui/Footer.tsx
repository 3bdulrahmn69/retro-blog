import { Link, useNavigate, useLocation } from 'react-router';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
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
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'primary.light',
        py: 4,
        borderTop: 4,
        borderColor: 'primary.main',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 4,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontFamily: 'monospace',
              }}
            >
              RETRO BLOG
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              A nostalgic journey through the digital ages. Blogging like it's
              1995!
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontFamily: 'monospace',
              }}
            >
              NAVIGATION
            </Typography>
            <List dense>
              {[
                { label: 'Home', section: 'home' },
                { label: 'Blog', section: 'blog' },
                { label: 'About', section: 'about' },
                { label: 'FAQ', section: 'faq' },
                { label: 'Contact', section: 'contact' },
              ].map(({ label, section }) => (
                <ListItem key={section} disablePadding>
                  <ListItemButton
                    onClick={() => handleSectionNavigation(section)}
                    sx={{
                      px: 0,
                      py: 0.5,
                      color: 'primary.light',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'white',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontFamily: 'monospace',
              }}
            >
              LEGAL
            </Typography>
            <List dense>
              {[
                { label: 'Terms of Service', to: '/terms' },
                { label: 'Privacy Policy', to: '/privacy' },
                { label: 'Cookie Policy', to: '/cookies' },
              ].map(({ label, to }) => (
                <ListItem key={to} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={to}
                    sx={{
                      px: 0,
                      py: 0.5,
                      color: 'primary.light',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'white',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontFamily: 'monospace',
              }}
            >
              CONNECT
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <IconButton
                component="a"
                href="https://github.com/3bdulrahmn69"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.light',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/3bdulrahmn69"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.light',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com/3bdulrahmn69"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.light',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                <Twitter />
              </IconButton>
            </Box>
            <Button
              size="sm"
              onClick={() => handleSectionNavigation('contact')}
            >
              CONTACT US
            </Button>
          </Box>
        </Box>

        <Divider
          sx={{
            borderColor: 'primary.main',
            mt: 4,
            mb: 4,
          }}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            ©{new Date().getFullYear()} Abdulrahman Moussa. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.875rem', mt: 1 }}>
            Made with 64KB of RAM and plenty of nostalgia.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
