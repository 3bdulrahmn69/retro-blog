import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AuthToggle from '../components/auth/AuthToggle';
import AuthWelcome from '../components/auth/AuthWelcome';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { userLogin, userRegister } from '../utils/api';
import useAuth from '../hooks/useAuth';
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../utils/validation';

const BackButton = styled(Link)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  display: 'inline-block',
  backgroundColor: theme.palette.primary.light,
  border: `2px solid ${theme.palette.primary.dark}`,
  boxShadow: '4px 4px 0px 0px rgba(180,83,9)',
  padding: theme.spacing(1, 2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '80',
    transform: 'translate(4px, 4px)',
    boxShadow: '2px 2px 0px 0px rgba(180,83,9)',
  },
}));

const AuthPage = () => {
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const [animating, setAnimating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const { mod } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mod === 'register') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
    setValidationErrors({ name: '', email: '', password: '' });
  }, [mod]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/blog');
    }
  }, [isAuthenticated, navigate]);

  const handleModeChange = (mode: string) => {
    setAnimating(true);
    setTimeout(() => {
      navigate(`/auth/${mode}`);
      setAnimating(false);
    }, 300);
  };

  const validateForm = (): boolean => {
    const errors = { name: '', email: '', password: '' };
    let isValid = true;

    const emailValidation = validateEmail(userForm.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.message;
      isValid = false;
    }

    const passwordValidation = validatePassword(userForm.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message;
      isValid = false;
    }

    if (!isLogin) {
      const nameValidation = validateName(userForm.name);
      if (!nameValidation.isValid) {
        errors.name = nameValidation.message;
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleNameChange = (name: string) => {
    setUserForm({ ...userForm, name });
    if (name.trim()) {
      const nameValidation = validateName(name);
      setValidationErrors((prev) => ({
        ...prev,
        name: nameValidation.isValid ? '' : nameValidation.message,
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (email: string) => {
    setUserForm({ ...userForm, email });
    if (email.trim()) {
      const emailValidation = validateEmail(email);
      setValidationErrors((prev) => ({
        ...prev,
        email: emailValidation.isValid ? '' : emailValidation.message,
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (password: string) => {
    setUserForm({ ...userForm, password });
    if (password) {
      const passwordValidation = validatePassword(password);
      setValidationErrors((prev) => ({
        ...prev,
        password: passwordValidation.isValid ? '' : passwordValidation.message,
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    if (isLogin) {
      try {
        const userData = await userLogin(userForm.email, userForm.password);
        if (userData) {
          const { accessToken, user } = userData;
          const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            token: accessToken,
          };
          login(userInfo);
        } else {
          setValidationErrors((prev) => ({
            ...prev,
            email: 'Invalid email or password',
            password: 'Invalid email or password',
          }));
        }
      } catch (error) {
        console.error('Login failed', error);
        setValidationErrors((prev) => ({
          ...prev,
          email: 'Login failed. Please try again.',
          password: 'Login failed. Please try again.',
        }));
      }
    } else {
      try {
        const userData = await userRegister(
          userForm.name,
          userForm.email,
          userForm.password
        );
        if (userData) {
          const { accessToken, user } = userData;
          const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            token: accessToken,
          };
          login(userInfo);
        } else {
          setValidationErrors((prev) => ({
            ...prev,
            email: 'Registration failed. Email might already exist.',
          }));
        }
      } catch (error) {
        console.error('Registration failed', error);
        setValidationErrors((prev) => ({
          ...prev,
          email: 'Registration failed. Please try again.',
        }));
      }
    }

    setIsSubmitting(false);
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.light' + '40',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        fontFamily: 'monospace',
        position: 'relative',
      }}
    >
      {' '}
      <BackButton to="/">← Back to Home</BackButton>
      <AuthToggle
        isLogin={isLogin}
        onModeChange={handleModeChange}
        isInitialLoad={isInitialLoad}
      />
      <Box
        sx={{
          width: '100%',
          maxWidth: '80rem',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 2,
          mt: 6,
          alignItems: 'stretch',
        }}
      >
        {' '}
        {/* Left Side */}
        <Box
          sx={{
            display: 'flex',
            transition: 'all 0.3s ease',
            transform: animating ? 'scale(0.95)' : 'scale(1)',
            opacity: isInitialLoad ? 0 : 1,
            translateY: isInitialLoad ? '16px' : '0',
          }}
        >
          {isLogin ? (
            <Form
              title="WELCOME TO RETRO BLOG"
              onSubmit={() => {}}
              sx={{ flex: 1, height: '100%' }}
            >
              <AuthWelcome>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}
                >
                  Welcome Back to Retro Blog!
                </Typography>
                <Typography sx={{ color: 'primary.main', mb: 1.5 }}>
                  Log in to your account to continue your retro blogging
                  journey. Share your thoughts with a nostalgic flair!
                </Typography>
                <Typography sx={{ color: 'primary.main' }}>
                  Don't have an account yet? Click the REGISTER button to join
                  our retro community!
                </Typography>
              </AuthWelcome>
            </Form>
          ) : (
            <Form
              title="REGISTER"
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              sx={{ flex: 1, height: '100%' }}
            >
              <Input
                label="Full Name"
                value={userForm.name}
                onChange={handleNameChange}
                error={validationErrors.name}
                placeholder="Enter your full name"
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={userForm.email}
                onChange={handleEmailChange}
                error={validationErrors.email}
                placeholder="Enter your email"
                required
              />
              <Input
                label="Password"
                type="password"
                value={userForm.password}
                onChange={handlePasswordChange}
                error={validationErrors.password}
                placeholder="Enter your password"
                required
              />
              <Box sx={{ mt: 'auto' }}>
                <Button type="submit" disabled={isSubmitting} fullWidth>
                  {isSubmitting ? 'REGISTERING...' : 'REGISTER'}
                </Button>
              </Box>
            </Form>
          )}
        </Box>{' '}
        {/* Right Side */}
        <Box
          sx={{
            display: 'flex',
            transition: 'all 0.3s ease',
            transform: animating ? 'scale(0.95)' : 'scale(1)',
            opacity: isInitialLoad ? 0 : 1,
            translateY: isInitialLoad ? '16px' : '0',
            transitionDelay: isInitialLoad ? '100ms' : '0ms',
          }}
        >
          {isLogin ? (
            <Form
              title="LOGIN"
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              sx={{ flex: 1, height: '100%' }}
            >
              <Input
                label="Email Address"
                type="email"
                value={userForm.email}
                onChange={handleEmailChange}
                error={validationErrors.email}
                placeholder="Enter your email"
                required
              />
              <Input
                label="Password"
                type="password"
                value={userForm.password}
                onChange={handlePasswordChange}
                error={validationErrors.password}
                placeholder="Enter your password"
                required
              />
              <Box sx={{ mt: 'auto' }}>
                <Button type="submit" disabled={isSubmitting} fullWidth>
                  {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
                </Button>
              </Box>
            </Form>
          ) : (
            <Form
              title="WELCOME TO RETRO BLOG"
              onSubmit={() => {}}
              sx={{ flex: 1, height: '100%' }}
            >
              <AuthWelcome>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}
                >
                  Join The Retro Blog!
                </Typography>
                <Typography sx={{ color: 'primary.main', mb: 1.5 }}>
                  Create an account and start your nostalgic blogging
                  experience. Express yourself with the charm of the past!
                </Typography>
                <Typography sx={{ color: 'primary.main' }}>
                  Already have an account? Click the LOGIN button to access your
                  retro dashboard!
                </Typography>
              </AuthWelcome>
            </Form>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
