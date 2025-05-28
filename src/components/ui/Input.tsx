import React, { useState } from 'react';

interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'search';
  onSubmit?: () => void;
  submitButtonText?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  variant = 'default',
  onSubmit,
  submitButtonText = 'SUBMIT',
  icon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const isSearchField = variant === 'search';
  const inputType = isPasswordField
    ? showPassword
      ? 'text'
      : 'password'
    : type;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  const renderInput = () => (
    <div className="relative">
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 bg-amber-50 border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-mono transition-colors ${
          isPasswordField ? 'pr-12' : ''
        } ${isSearchField && onSubmit ? 'pr-20' : ''} ${
          error
            ? 'border-red-600 focus:border-red-600 focus:ring-red-500'
            : 'border-amber-700'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        {...props}
      />

      {/* Password toggle button */}
      {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800 font-mono text-sm font-bold"
        >
          {showPassword ? 'HIDE' : 'SHOW'}
        </button>
      )}

      {/* Search submit button */}
      {isSearchField && onSubmit && (
        <button
          type="button"
          onClick={onSubmit}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-amber-600 text-white hover:bg-amber-700 transition-colors border border-amber-700 font-mono text-xs font-bold rounded"
        >
          {submitButtonText}
        </button>
      )}

      {/* Icon */}
      {icon && !isPasswordField && !isSearchField && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600">
          {icon}
        </div>
      )}
    </div>
  );

  // Search variant - inline with submit button
  if (isSearchField) {
    return (
      <div className={`${className}`}>
        {label && (
          <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm mb-2">
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <div className="bg-amber-50 border-2 border-amber-600 shadow-[2px_2px_0px_0px_rgba(180,83,9)] flex">
          <input
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 px-4 py-2 bg-transparent text-amber-800 placeholder-amber-600 focus:outline-none font-mono text-sm"
            {...props}
          />
          {onSubmit && (
            <button
              type="button"
              onClick={onSubmit}
              className="px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 transition-colors border-l-2 border-amber-700 font-mono text-sm font-bold"
            >
              {submitButtonText}
            </button>
          )}
        </div>
        {error && (
          <p className="text-red-600 text-sm font-mono bg-red-50 border border-red-200 px-2 py-1 rounded mt-2">
            {'>'} {error}
          </p>
        )}
      </div>
    );
  }

  // Default variant - standard form input
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && (
        <p className="text-red-600 text-sm font-mono bg-red-50 border border-red-200 px-2 py-1 rounded">
          {'>'} {error}
        </p>
      )}
    </div>
  );
};

export default Input;
