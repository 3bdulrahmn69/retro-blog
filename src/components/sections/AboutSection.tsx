import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Container from '../ui/Container';
import Section from '../ui/Section';

const AboutCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.dark}`,
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
  transition: 'all 0.7s ease',
}));

const AboutHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  padding: theme.spacing(2),
  color: theme.palette.primary.dark,
  textAlign: 'center',
  fontWeight: 'bold',
  borderBottom: `4px solid ${theme.palette.primary.dark}`,
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light + '40',
  padding: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

const AboutSection = ({ activeSection }: { activeSection: number }) => {
  return (
    <Section id="about" sx={{ backgroundColor: 'primary.light' + '40' }}>
      <Container>
        <AboutCard
          sx={{
            opacity: activeSection >= 2 ? 1 : 0,
            transform:
              activeSection >= 2 ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <AboutHeader>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                letterSpacing: '0.1em',
                fontFamily: 'Orbitron, monospace',
              }}
            >
              ABOUT RETRO BLOG
            </Typography>
          </AboutHeader>

          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.75rem', md: '2rem' },
                  fontWeight: 'bold',
                  color: 'primary.dark',
                  mb: 3,
                }}
              >
                Nostalgia-Driven Blogging
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.main',
                  lineHeight: 1.6,
                }}
              >
                Retro Blog was founded in 2025 by a group of tech enthusiasts
                who missed the aesthetic charm of early computing. Our platform
                combines the visual appeal of 80s and 90s interfaces with modern
                functionality.
              </Typography>
            </Box>{' '}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                mt: 4,
              }}
            >
              <Box sx={{ flex: { xs: '1', md: '1 1 33.333%' } }}>
                <FeatureCard>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      color: 'primary.dark',
                      mb: 2,
                    }}
                  >
                    Retro Design
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      lineHeight: 1.5,
                    }}
                  >
                    We embrace chunky borders, vibrant gradients, and pixelated
                    charm.
                  </Typography>
                </FeatureCard>
              </Box>
              <Box sx={{ flex: { xs: '1', md: '1 1 33.333%' } }}>
                <FeatureCard>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      color: 'primary.dark',
                      mb: 2,
                    }}
                  >
                    Modern Tech
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      lineHeight: 1.5,
                    }}
                  >
                    Built with React and TypeScript for a smooth experience.
                  </Typography>
                </FeatureCard>
              </Box>
              <Box sx={{ flex: { xs: '1', md: '1 1 33.333%' } }}>
                {' '}
                <FeatureCard>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      color: 'primary.dark',
                      mb: 2,
                    }}
                  >
                    Community Focus
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      lineHeight: 1.5,
                    }}
                  >
                    A platform for sharing knowledge with fellow retro
                    enthusiasts.
                  </Typography>
                </FeatureCard>
              </Box>
            </Box>
          </Box>
        </AboutCard>
      </Container>
    </Section>
  );
};

export default AboutSection;
