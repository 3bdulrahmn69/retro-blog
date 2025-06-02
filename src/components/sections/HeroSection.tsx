import { Link } from 'react-router';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Container from '../ui/Container';
import Section from '../ui/Section';
import Button from '../ui/Button';
import RetroTerminal from '../ui/RetroTerminal';

// Retro glow animation
const retroGlow = keyframes`
  0%, 100% { box-shadow: 8px 8px 0px 0px rgba(180,83,9); }
  50% { box-shadow: 8px 8px 0px 0px rgba(180,83,9), 0 0 20px rgba(251,191,36,0.5); }
`;

const HeroCard = styled(Box)(() => ({
  backgroundColor: '#ffffff',
  border: '4px solid #b45309',
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
}));

const HeroHeader = styled(Box)(() => ({
  background: 'linear-gradient(to right, #fbbf24, #d97706)',
  padding: 16,
  color: '#78350f',
  textAlign: 'center',
  fontWeight: 'bold',
  borderBottom: '4px solid #b45309',
}));

const GlowButton = styled(Box)(() => ({
  animation: `${retroGlow} 2s ease-in-out infinite`,
  '& > a': {
    display: 'block',
    textDecoration: 'none',
  },
}));

const TerminalText = styled(Typography)(() => ({
  fontFamily: 'Courier New, monospace',
  color: '#92400e',
  fontSize: '0.875rem',
  lineHeight: 1.6,
  margin: 0,
}));

const BlinkingCursor = styled('span')(() => ({
  animation: 'blink 1s infinite',
  '@keyframes blink': {
    '0%, 50%': { opacity: 1 },
    '51%, 100%': { opacity: 0 },
  },
}));

const HeroSection = ({ isLoaded }: { isLoaded: boolean }) => {
  return (
    <Section
      id="home"
      sx={{
        py: 10,
        transition: 'all 1s ease',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
      }}
    >
      <Container>
        <HeroCard>
          <HeroHeader>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '1.5rem', md: '2.25rem' },
                fontFamily: 'Courier New, monospace',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
              }}
            >
              WELCOME TO RETRO BLOG
            </Typography>
          </HeroHeader>{' '}
          <Box sx={{ p: { xs: 6, md: 8 } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 8,
                alignItems: 'center',
              }}
            >
              <Box sx={{ flex: { xs: '1', md: '1 1 50%' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      color: '#92400e',
                      fontFamily: 'inherit',
                    }}
                  >
                    A Journey Back in Digital Time
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#b45309',
                      lineHeight: 1.6,
                      fontFamily: 'inherit',
                    }}
                  >
                    Experience the nostalgic charm of vintage computing with our
                    retro-themed blog platform. Share your thoughts with the
                    aesthetic of yesteryear.
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 4,
                      pt: 4,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <GlowButton>
                        <Link
                          to="/auth/register"
                          style={{ textDecoration: 'none' }}
                        >
                          <Button fullWidth>JOIN NOW</Button>
                        </Link>
                      </GlowButton>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Link to="/blog" style={{ textDecoration: 'none' }}>
                        <Button fullWidth variant="secondary">
                          READ BLOG
                        </Button>
                      </Link>
                    </Box>
                  </Box>{' '}
                </Box>
              </Box>

              <Box sx={{ flex: { xs: '1', md: '1 1 50%' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <RetroTerminal title="retro-terminal" size="lg">
                    <TerminalText>{'>'} Welcome to Retro Blog</TerminalText>
                    <TerminalText>{'>'} The year is 2025</TerminalText>
                    <TerminalText>{'>'} But the aesthetic is 1995</TerminalText>
                    <TerminalText>{'>'} Loading nostalgia...</TerminalText>
                    <TerminalText sx={{ mt: 4 }}>
                      {'>'} Press Enter key to continue
                      <BlinkingCursor>_</BlinkingCursor>
                    </TerminalText>{' '}
                  </RetroTerminal>
                </Box>
              </Box>
            </Box>
          </Box>
        </HeroCard>
      </Container>
    </Section>
  );
};

export default HeroSection;
