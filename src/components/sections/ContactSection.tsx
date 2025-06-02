import { Box, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Section from '../ui/Section';

const ContactCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.dark}`,
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
  transition: 'all 0.7s ease',
}));

const ContactHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  padding: theme.spacing(2),
  color: theme.palette.primary.dark,
  textAlign: 'center',
  fontWeight: 'bold',
  borderBottom: `4px solid ${theme.palette.primary.dark}`,
}));

const OfficeHoursCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light + '40',
  padding: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.primary.light + '40',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 0,
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontSize: '0.875rem',
    '&.Mui-focused': {
      color: theme.palette.primary.dark,
    },
  },
}));

const ContactSection = ({ activeSection }: { activeSection: number }) => {
  return (
    <Section id="contact" sx={{ backgroundColor: 'primary.light' + '40' }}>
      <Container>
        <ContactCard
          sx={{
            opacity: activeSection >= 4 ? 1 : 0,
            transform:
              activeSection >= 4 ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <ContactHeader>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                letterSpacing: '0.1em',
                fontFamily: 'Orbitron, monospace',
              }}
            >
              CONTACT US
            </Typography>
          </ContactHeader>{' '}
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
              }}
            >
              <Box sx={{ flex: { xs: '1', md: '1 1 50%' } }}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: 'primary.dark',
                      mb: 2,
                    }}
                  >
                    Send Us a Message
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'primary.main',
                      lineHeight: 1.6,
                      mb: 3,
                    }}
                  >
                    Have questions or suggestions? Drop us a line and we'll get
                    back to you as soon as our dial-up connection allows.
                  </Typography>
                </Box>

                <OfficeHoursCard>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      color: 'primary.dark',
                      mb: 2,
                    }}
                  >
                    Office Hours
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      lineHeight: 1.5,
                      mb: 1,
                    }}
                  >
                    Monday - Friday: 9:00 AM - 5:00 PM
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      lineHeight: 1.5,
                    }}
                  >
                    Weekends: Closed (Our computers need rest too)
                  </Typography>{' '}
                </OfficeHoursCard>
              </Box>

              <Box sx={{ flex: { xs: '1', md: '1 1 50%' } }}>
                <Box
                  component="form"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <StyledTextField
                    label="Your Name"
                    type="text"
                    aria-label="your name"
                    fullWidth
                    required
                  />

                  <StyledTextField
                    label="Email Address"
                    type="email"
                    aria-label="email"
                    fullWidth
                    required
                  />

                  <StyledTextField
                    label="Message"
                    multiline
                    rows={4}
                    aria-label="message"
                    fullWidth
                    required
                  />

                  <Box
                    component="a"
                    href="https://3bdulrahmn.vercel.app/#contact"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    <Button type="button">SEND MESSAGE</Button>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      fontSize: '0.75rem',
                      mt: 1,
                    }}
                  >
                    * Messages are delivered via virtual floppy disk. Please
                    allow 24-48 hours for response.{' '}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </ContactCard>
      </Container>
    </Section>
  );
};

export default ContactSection;
