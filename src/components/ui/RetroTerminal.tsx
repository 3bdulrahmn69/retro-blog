import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

interface RetroTerminalProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Retro flicker animation
const retroFlicker = keyframes`
  0%, 98% { opacity: 1; }
  99% { opacity: 0.98; }
  100% { opacity: 1; }
`;

const TerminalHeader = styled(Box)(({ theme }) => ({
  height: 16,
  backgroundColor: '#92400e',
  display: 'flex',
  alignItems: 'center',
  padding: '0 4px',
  [theme.breakpoints.up('sm')]: {
    height: 20,
    padding: '0 8px',
  },
  [theme.breakpoints.up('md')]: {
    height: 24,
    padding: '0 12px',
  },
}));

const TrafficLights = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  [theme.breakpoints.up('sm')]: {
    gap: 8,
  },
}));

const TrafficLight = styled(Box)<{ color: string }>(({ color, theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: color,
  [theme.breakpoints.up('sm')]: {
    width: 10,
    height: 10,
  },
  [theme.breakpoints.up('md')]: {
    width: 12,
    height: 12,
  },
}));

const TerminalTitle = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: '#ffffff',
  fontFamily: 'Courier New, monospace',
  marginLeft: 'auto',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  maxWidth: '60%',
  [theme.breakpoints.up('sm')]: {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
}));

const RetroTerminal = ({
  title,
  children,
  className = '',
  size = 'md',
}: RetroTerminalProps) => {
  const getSizeConfig = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return {
          maxWidth: { xs: '100%', sm: '384px' },
          border: '4px solid #92400e',
          padding: { xs: 2, sm: 3 },
          fontSize: { xs: '12px', sm: '14px' },
          minHeight: { xs: 80, sm: 100 },
        };
      case 'md':
        return {
          maxWidth: { xs: '100%', sm: '448px', md: '512px' },
          border: '6px solid #92400e',
          padding: { xs: 3, sm: 4 },
          fontSize: { xs: '14px', sm: '16px' },
          minHeight: { xs: 100, sm: 120 },
        };
      case 'lg':
        return {
          maxWidth: { xs: '100%', sm: '512px', md: '576px', lg: '672px' },
          border: '8px solid #92400e',
          padding: { xs: 4, sm: 5 },
          fontSize: { xs: '16px', sm: '18px' },
          minHeight: { xs: 120, sm: 140 },
        };
      default:
        return {
          maxWidth: { xs: '100%', sm: '448px', md: '512px' },
          border: '6px solid #92400e',
          padding: { xs: 3, sm: 4 },
          fontSize: { xs: '14px', sm: '16px' },
          minHeight: { xs: 100, sm: 120 },
        };
    }
  };

  const sizeConfig = getSizeConfig(size);

  return (
    <Box
      className={className}
      sx={{
        width: '100%',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        animation: `${retroFlicker} 3s infinite`,
        boxShadow: {
          xs: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          sm: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          md: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <TerminalHeader>
        <TrafficLights>
          <TrafficLight color="#ef4444" />
          <TrafficLight color="#f59e0b" />
          <TrafficLight color="#10b981" />
        </TrafficLights>
        <TerminalTitle>{title}</TerminalTitle>
      </TerminalHeader>
      <Box
        sx={{
          fontFamily: 'Courier New, monospace',
          color: '#92400e',
          textAlign: 'left',
          lineHeight: 1.6,
          ...sizeConfig,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default RetroTerminal;
