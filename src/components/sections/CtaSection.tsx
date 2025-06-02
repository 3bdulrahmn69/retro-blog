import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Section from '../ui/Section';
import Container from '../ui/Container';
import { Link } from 'react-router';
import Button from '../ui/Button';

const retroGlow = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor;
  }
  50% {
    text-shadow: 
      0 0 10px currentColor,
      0 0 20px currentColor,
      0 0 30px currentColor;
  }
`;

const CtaBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[8],
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6),
  },
}));

const AnimatedButtonWrapper = styled(Box)({
  display: 'inline-block',
  animation: `${retroGlow} 2s ease-in-out infinite`,
});

const CtaSection = () => {
  return (
    <Section id="CTA">
      <Container>
        <CtaBox>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 2,
              fontFamily: 'Orbitron, monospace',
            }}
          >
            JOIN THE RETRO REVOLUTION
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
            }}
          >
            Become part of our community and share your passion for retro
            computing.
          </Typography>
          <AnimatedButtonWrapper>
            <Link to="/auth/register" style={{ textDecoration: 'none' }}>
              <Button>GET STARTED</Button>
            </Link>
          </AnimatedButtonWrapper>
        </CtaBox>
      </Container>
    </Section>
  );
};

export default CtaSection;
