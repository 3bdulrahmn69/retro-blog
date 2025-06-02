import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Language as WebIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import Button from '../ui/Button';
import Container from '../ui/Container';
import RetroTerminal from '../ui/RetroTerminal';
import Section from '../ui/Section';

interface DeveloperSectionProps {
  activeSection: number;
}

const DeveloperCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.dark}`,
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
  transition: 'all 0.7s ease',
}));

const DeveloperHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  padding: theme.spacing(2),
  color: theme.palette.primary.dark,
  textAlign: 'center',
  fontWeight: 'bold',
  borderBottom: `4px solid ${theme.palette.primary.dark}`,
}));

const TechStackCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light + '40',
  padding: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

const ProjectInfoCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light + '40',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

const DeveloperSection = ({ activeSection }: DeveloperSectionProps) => {
  return (
    <Section id="developer" sx={{ backgroundColor: 'primary.light' + '40' }}>
      <Container>
        <DeveloperCard
          sx={{
            opacity: activeSection >= 5 ? 1 : 0,
            transform:
              activeSection >= 5 ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <DeveloperHeader>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                letterSpacing: '0.1em',
                fontFamily: 'Orbitron, monospace',
              }}
            >
              MEET THE DEVELOPER
            </Typography>
          </DeveloperHeader>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.75rem', md: '2rem' },
                      fontWeight: 'bold',
                      color: 'primary.dark',
                      mb: 1,
                    }}
                  >
                    Hello, I'm Abdulrahman
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    Front-end Developer & Retro Enthusiast
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'primary.main',
                    lineHeight: 1.6,
                    mb: 3,
                  }}
                >
                  I'm a passionate developer who created Retro Blog as a tribute
                  to the golden age of computing. This project combines my love
                  for vintage aesthetics with modern web technologies,
                  showcasing my skills in creating immersive user experiences.
                </Typography>

                <TechStackCard sx={{ mb: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      color: 'primary.dark',
                      mb: 2,
                    }}
                  >
                    Tech Stack Used
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: 'primary.main', fontSize: '0.875rem' }}
                    >
                      • React 18
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'primary.main', fontSize: '0.875rem' }}
                    >
                      • TypeScript
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'primary.main', fontSize: '0.875rem' }}
                    >
                      • Material-UI
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'primary.main', fontSize: '0.875rem' }}
                    >
                      • React Router
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'primary.main', fontSize: '0.875rem' }}
                    >
                      • Vite
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'primary.main', fontSize: '0.875rem' }}
                    >
                      • Modern ES6+
                    </Typography>
                  </Box>
                </TechStackCard>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    component="a"
                    href="https://3bdulrahmn.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: 'none', display: 'block' }}
                  >
                    <Button variant="primary" size="md" fullWidth>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                        }}
                      >
                        <WebIcon sx={{ fontSize: '1rem' }} />
                        VIEW PORTFOLIO
                      </Box>
                    </Button>
                  </Box>
                  <Box
                    component="a"
                    href="https://github.com/3bdulrahmn69"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: 'none', display: 'block' }}
                  >
                    <Button variant="secondary" size="md" fullWidth>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                        }}
                      >
                        <GitHubIcon sx={{ fontSize: '1rem' }} />
                        GITHUB
                      </Box>
                    </Button>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 2,
                  }}
                >
                  <Box
                    component="a"
                    href="https://linkedin.com/in/3bdulrahmn69"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: 'none', display: 'block' }}
                  >
                    <Button variant="secondary" size="md" fullWidth>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                        }}
                      >
                        <LinkedInIcon sx={{ fontSize: '1rem' }} />
                        LINKEDIN
                      </Box>
                    </Button>
                  </Box>
                  <Box
                    component="a"
                    href="mailto:abdulrahmanmoussa69@gmail.com"
                    sx={{ textDecoration: 'none', display: 'block' }}
                  >
                    <Button variant="primary" size="md" fullWidth>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                        }}
                      >
                        <EmailIcon sx={{ fontSize: '1rem' }} />
                        EMAIL ME
                      </Box>
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <RetroTerminal title="developer-workplace">
                    <Typography sx={{ color: 'success.main' }}>
                      # Development Stats
                    </Typography>
                    <Typography>{'>'} Projects completed: 15+</Typography>
                    <Typography>{'>'} Lines of code: 50K+</Typography>
                    <Typography>{'>'} YouTube consumed: ∞</Typography>
                    <Typography>{'>'} Retro vibes: Maximum</Typography>
                    <Typography sx={{ mt: 2, color: 'info.main' }}>
                      # Specializations
                    </Typography>
                    <Typography>{'>'} Front-end Development</Typography>
                    <Typography>{'>'} Responsive Design</Typography>
                    <Typography>{'>'} Modern Web Technologies</Typography>
                    <Typography
                      sx={{
                        mt: 2,
                        color: 'success.main',
                        animation: 'pulse 2s infinite',
                      }}
                    >
                      {'>'} Building innovative solutions_
                    </Typography>
                  </RetroTerminal>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'primary.light' }}
            >
              <ProjectInfoCard>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: 'primary.dark',
                    mb: 2,
                  }}
                >
                  About This Project
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'primary.main',
                    lineHeight: 1.6,
                    mb: 2,
                  }}
                >
                  Retro Blog represents my passion for combining nostalgic
                  design with modern development practices. Built during my web
                  development journey, this project showcases responsive design,
                  component architecture, and attention to user experience
                  details.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'primary.main',
                    lineHeight: 1.6,
                  }}
                >
                  <strong>Want to see more of my work?</strong> Check out my
                  portfolio to explore other projects including e-commerce
                  platforms, productivity tools, and interactive web
                  applications.
                </Typography>
              </ProjectInfoCard>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Box
                component="a"
                href="https://3bdulrahmn.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Button variant="primary" sx={{ px: 4 }}>
                  EXPLORE MY FULL PORTFOLIO
                </Button>
              </Box>
            </Box>
          </Box>
        </DeveloperCard>
      </Container>
    </Section>
  );
};

export default DeveloperSection;
