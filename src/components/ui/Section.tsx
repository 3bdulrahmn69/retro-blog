import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import type { TypographyProps } from '@mui/material/Typography';

interface TitleProps extends Omit<TypographyProps, 'children'> {
  children: React.ReactNode;
}

export const Title = ({ children, sx, ...props }: TitleProps) => {
  return (
    <Typography
      variant="h2"
      component="h2"
      sx={{
        fontSize: { xs: '1.875rem', md: '2.25rem' },
        fontWeight: 700,
        color: 'primary.dark',
        mb: 4,
        textAlign: 'center',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const Subtitle = ({ children, sx, ...props }: TitleProps) => {
  return (
    <Typography
      variant="h3"
      component="span"
      sx={{
        fontSize: { xs: '1.5rem', md: '1.875rem' },
        fontWeight: 600,
        color: 'primary.main',
        mb: 2,
        textAlign: 'center',
        display: 'block',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

interface SectionProps extends Omit<BoxProps, 'children'> {
  children: React.ReactNode;
  id: string;
}

const Section = ({ id, children, sx, ...props }: SectionProps) => {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: 8,
        position: 'relative',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Section;
