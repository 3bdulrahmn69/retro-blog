import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import AuthToggle from '../components/auth/AuthToggle';
import AuthWelcome from '../components/auth/AuthWelcome';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
  // State to manage login/registration mode
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Animation state
  const [animating, setAnimating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const { mod } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mod === 'register') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [mod]);

  const handleModeChange = (mode: string) => {
    setAnimating(true);
    setTimeout(() => {
      navigate(`/auth/${mode}`);
      setAnimating(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login attempt with:', {
        email: user.email,
        password: user.password,
      });
    } else {
      console.log('Registration attempt with:', {
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 font-mono">
      <AuthToggle
        isLogin={isLogin}
        onModeChange={handleModeChange}
        isInitialLoad={isInitialLoad}
      />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
        {/* Left Side */}
        <div
          className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] h-full transition-all duration-300 ${
            animating ? 'transform scale-95' : 'transform scale-100'
          } ${
            isInitialLoad
              ? 'opacity-0 translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}
        >
          {isLogin ? (
            <AuthForm title="LOGIN">
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
            </AuthForm>
          ) : (
            <AuthForm title="REGISTER">
              <RegisterForm
                name={user.name}
                setName={(name: string) => setUser({ ...user, name })}
                email={user.email}
                setEmail={(email: string) => setUser({ ...user, email })}
                password={user.password}
                setPassword={(password: string) =>
                  setUser({ ...user, password })
                }
                onSubmit={handleSubmit}
              />
            </AuthForm>
          )}
        </div>

        {/* Right Side */}
        <div
          className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] h-full transition-all duration-300 ${
            animating ? 'transform scale-95' : 'transform scale-100'
          } ${
            isInitialLoad
              ? 'opacity-0 translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionDelay: isInitialLoad ? '100ms' : '0ms' }}
        >
          {isLogin ? (
            <AuthForm title="LOGIN">
              <LoginForm
                email={user.email}
                setEmail={(email: string) => setUser({ ...user, email })}
                password={user.password}
                setPassword={(password: string) =>
                  setUser({ ...user, password })
                }
                onSubmit={handleSubmit}
              />
            </AuthForm>
          ) : (
            <AuthForm title="WELCOME">
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
            </AuthForm>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
