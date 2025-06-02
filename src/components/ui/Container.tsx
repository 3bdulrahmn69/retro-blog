import { Box, type BoxProps } from '@mui/material';

interface ContainerProps extends Omit<BoxProps, 'children'> {
  children: React.ReactNode;
}

const Container = ({ children, sx, ...props }: ContainerProps) => {
  return (
    <Box
      sx={{
        maxWidth: '1280px',
        mx: 'auto',
        px: { xs: 2, sm: 3, lg: 4 },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Container;
