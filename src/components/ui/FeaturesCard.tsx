import { Link } from 'react-router';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from './Button';

interface FeaturesCardProps {
  delay?: number;
  isLoaded: boolean;
  title: string;
  span: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const StyledCard = styled(Card)(() => ({
  backgroundColor: '#ffffff',
  border: '4px solid #b45309',
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
  transition: 'all 0.5s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '10px 10px 0px 0px rgba(180,83,9)',
  },
}));

const CardHeader = styled(Box)(() => ({
  background: 'linear-gradient(to right, #fbbf24, #d97706)',
  padding: 16,
  color: '#78350f',
  fontWeight: 'bold',
  borderBottom: '4px solid #b45309',
}));

const IconContainer = styled(Avatar)(() => ({
  width: 64,
  height: 64,
  backgroundColor: '#fef3c7',
  color: '#b45309',
  margin: '0 auto',
  marginBottom: 16,
}));

const FeaturesCard = ({
  isLoaded,
  delay = 100,
  title,
  span,
  subtitle,
  description,
  icon,
  link,
}: FeaturesCardProps) => {
  return (
    <StyledCard
      sx={{
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <CardHeader>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{ fontSize: '1.125rem' }}
          >
            {title}
          </Typography>
          <Chip
            label={span}
            size="small"
            sx={{
              backgroundColor: '#fef3c7',
              color: '#78350f',
              fontSize: '0.75rem',
              height: 24,
              fontWeight: 'bold',
            }}
          />
        </Box>
      </CardHeader>
      <CardContent
        sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}
      >
        <IconContainer>{icon}</IconContainer>
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 'bold',
            color: '#92400e',
            mb: 2,
            textAlign: 'center',
            fontSize: '1.25rem',
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#b45309',
            mb: 2,
            flexGrow: 1,
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          <Link to={link} style={{ textDecoration: 'none' }} aria-label="blog">
            <Button variant="outline" size="sm">
              LEARN MORE
            </Button>
          </Link>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default FeaturesCard;
