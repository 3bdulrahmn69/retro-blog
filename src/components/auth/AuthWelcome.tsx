import React from 'react';

interface AuthWelcomeProps {
  children: React.ReactNode;
}

const AuthWelcome: React.FC<AuthWelcomeProps> = ({
  children,
}) => {
  return (
    <div
      className={`p-6 flex flex-col justify-center min-h-[400px] transition-all duration-300`}
    >
      {children}
    </div>
  );
};

export default AuthWelcome;
