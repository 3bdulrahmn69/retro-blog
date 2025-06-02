import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import Button from '../components/ui/Button';

const blinkAnimation = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const ErrorContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '32rem',
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.dark}`,
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
  transition: 'all 0.5s ease',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  padding: theme.spacing(1),
  color: theme.palette.primary.dark,
  textAlign: 'center',
  fontWeight: 'bold',
  borderBottom: `4px solid ${theme.palette.primary.dark}`,
}));

const ErrorBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light + '80',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(2),
}));

const BlinkingCursor = styled('span')({
  animation: `${blinkAnimation} 1s infinite`,
});

const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light + '80',
  padding: theme.spacing(1.5),
  borderTop: `4px solid ${theme.palette.primary.dark}`,
  textAlign: 'center',
  color: theme.palette.primary.dark,
}));

const NotFoundPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blinkCursor, setBlinkCursor] = useState(true);

  useEffect(() => {
    // Simulate "loading" for retro effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setBlinkCursor((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.light' + '40',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        fontFamily: 'monospace',
      }}
    >
      <ErrorContainer
        sx={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
        }}
      >
        <HeaderSection>
          <Typography
            variant="h4"
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              fontFamily: 'monospace',
            }}
          >
            ERROR 404
          </Typography>
        </HeaderSection>

        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ErrorBox>
            <Typography
              sx={{ fontWeight: 'bold', color: 'primary.dark', mb: 1 }}
            >
              System Error:
            </Typography>
            <Typography sx={{ color: 'primary.main', fontFamily: 'monospace' }}>
              &gt; The page you are looking for does not exist
              {blinkCursor ? <BlinkingCursor>_</BlinkingCursor> : ' '}
            </Typography>
            <Typography
              sx={{ color: 'primary.main', fontFamily: 'monospace', mt: 1 }}
            >
              &gt; Error code: PAGE_NOT_FOUND
            </Typography>
          </ErrorBox>

          <ErrorBox>
            <Typography
              sx={{ fontWeight: 'bold', color: 'primary.dark', mb: 1 }}
            >
              Suggested Actions:
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'disc',
                listStylePosition: 'inside',
                color: 'primary.main',
                m: 0,
                pl: 2,
              }}
            >
              <Typography component="li" sx={{ color: 'primary.main' }}>
                Check the URL for typing errors
              </Typography>
              <Typography component="li" sx={{ color: 'primary.main' }}>
                Return to the homepage
              </Typography>
              <Typography component="li" sx={{ color: 'primary.main' }}>
                Contact system administrator
              </Typography>
            </Box>
          </ErrorBox>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              pt: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
                <Button fullWidth>RETURN HOME</Button>
              </Link>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Link
                to="/blog"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <Button variant="secondary" fullWidth>
                  GO TO BLOG
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>

        <FooterSection>
          <Typography sx={{ fontSize: '0.875rem' }}>
            RETRO BLOG SYSTEM © {new Date().getFullYear()}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', mt: 0.5 }}>
            Memory available: 640K (Should be enough for anybody)
          </Typography>
        </FooterSection>
      </ErrorContainer>
    </Box>
  );
};

export default NotFoundPage;
