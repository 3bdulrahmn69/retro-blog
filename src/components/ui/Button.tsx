import React, { type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'subtle';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  className = '',
  ...props
}) => {
  // Base classes for all buttons
  const baseClasses =
    'font-bold border-b-4 transform hover:translate-y-0.5 transition-transform cursor-pointer';

  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary:
      'bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-amber-900 border-amber-700 hover:border-amber-800',
    secondary:
      'bg-gradient-to-r from-blue-400 to-cyan-600 hover:from-blue-500 hover:to-cyan-700 text-cyan-900 border-cyan-700 hover:border-cyan-800',
    danger:
      'bg-gradient-to-r from-red-400 to-rose-600 hover:from-red-500 hover:to-rose-700 text-rose-900 border-rose-700 hover:border-rose-800',
    outline:
      'bg-white hover:bg-amber-50 text-amber-700 border-amber-600 hover:border-amber-700',
    subtle:
      'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300 hover:border-amber-400',
  };

  const classes = `${baseClasses} ${widthClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
