import React from 'react';

interface AuthToggleProps {
  isLogin: boolean;
  onModeChange: (mode: string) => void;
  isInitialLoad: boolean;
}

const AuthToggle: React.FC<AuthToggleProps> = ({
  isLogin,
  onModeChange,
  isInitialLoad,
}) => {
  return (
    <div
      className={`absolute top-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-500 ${
        isInitialLoad ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="bg-white border-4 border-amber-700 flex shadow-[4px_4px_0px_0px_rgba(180,83,9)]">
        <button
          className={`px-4 py-2 font-bold text-sm cursor-pointer relative overflow-hidden transition-all duration-300 ${
            isLogin
              ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-amber-900'
              : 'bg-white text-amber-800 hover:bg-amber-50'
          }`}
          onClick={() => onModeChange('login')}
        >
          LOGIN
          {!isLogin && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          )}
        </button>
        <button
          className={`px-4 py-2 font-bold text-sm cursor-pointer relative overflow-hidden transition-all duration-300 ${
            !isLogin
              ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-amber-900'
              : 'bg-white text-amber-800 hover:bg-amber-50'
          }`}
          onClick={() => onModeChange('register')}
        >
          REGISTER
          {isLogin && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AuthToggle;
