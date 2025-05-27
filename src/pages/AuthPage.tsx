import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import AuthToggle from '../components/auth/AuthToggle';
import AuthWelcome from '../components/auth/AuthWelcome';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { userLogin, userRegister } from '../utils/api';
import { useAuth } from '../context/AuthContext ';
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../utils/validation';

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
      navigate('/');
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
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 font-mono relative">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="inline-block bg-amber-100 border-2 border-amber-700 shadow-[4px_4px_0px_0px_rgba(180,83,9)] px-4 py-2 text-amber-800 font-bold hover:bg-amber-200 transition-all duration-200 transform hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(180,83,9)]"
        >
          ← Back to Home
        </Link>
      </div>

      <AuthToggle
        isLogin={isLogin}
        onModeChange={handleModeChange}
        isInitialLoad={isInitialLoad}
      />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 md:items-stretch">
        {/* Left Side */}
        <div
          className={`flex transition-all duration-300 ${
            animating ? 'transform scale-95' : 'transform scale-100'
          } ${
            isInitialLoad
              ? 'opacity-0 translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}
        >
          {isLogin ? (
            <Form
              title="WELCOME TO RETRO BLOG"
              onSubmit={() => {}}
              className="flex-1 h-full"
            >
              <AuthWelcome>
                <h2 className="text-2xl font-bold text-amber-800 mb-4">
                  Welcome Back to Retro Blog!
                </h2>
                <p className="text-amber-700 mb-3">
                  Log in to your account to continue your retro blogging
                  journey. Share your thoughts with a nostalgic flair!
                </p>
                <p className="text-amber-700">
                  Don't have an account yet? Click the REGISTER button to join
                  our retro community!
                </p>
              </AuthWelcome>
            </Form>
          ) : (
            <Form
              title="REGISTER"
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              className="flex-1 h-full"
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
              <div className="mt-auto">
                <Button type="submit" disabled={isSubmitting} fullWidth>
                  {isSubmitting ? 'REGISTERING...' : 'REGISTER'}
                </Button>
              </div>
            </Form>
          )}
        </div>

        {/* Right Side */}
        <div
          className={`flex transition-all duration-300 ${
            animating ? 'transform scale-95' : 'transform scale-100'
          } ${
            isInitialLoad
              ? 'opacity-0 translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionDelay: isInitialLoad ? '100ms' : '0ms' }}
        >
          {isLogin ? (
            <Form
              title="LOGIN"
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              className="flex-1 h-full"
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
              <div className="mt-auto">
                <Button type="submit" disabled={isSubmitting} fullWidth>
                  {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
                </Button>
              </div>
            </Form>
          ) : (
            <Form
              title="WELCOME TO RETRO BLOG"
              onSubmit={() => {}}
              className="flex-1 h-full"
            >
              <AuthWelcome>
                <h2 className="text-2xl font-bold text-amber-800 mb-4">
                  Join The Retro Blog!
                </h2>
                <p className="text-amber-700 mb-3">
                  Create an account and start your nostalgic blogging
                  experience. Express yourself with the charm of the past!
                </p>
                <p className="text-amber-700">
                  Already have an account? Click the LOGIN button to access your
                  retro dashboard!
                </p>
              </AuthWelcome>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
