import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}) => {
  const baseClasses = `
    font-mono font-bold uppercase tracking-wider
    border-2 transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:transform-none disabled:shadow-none
    cursor-pointer
  `;

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: `
      bg-yellow-400 border-amber-700 text-amber-900
      shadow-[4px_4px_0px_0px_rgba(180,83,9)]
      hover:bg-yellow-300 hover:shadow-[6px_6px_0px_0px_rgba(180,83,9)]
      active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(180,83,9)]
      focus:ring-yellow-500
    `,
    secondary: `
      bg-amber-100 border-amber-600 text-amber-800
      shadow-[3px_3px_0px_0px_rgba(180,83,9)]
      hover:bg-amber-200 hover:shadow-[5px_5px_0px_0px_rgba(180,83,9)]
      active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(180,83,9)]
      focus:ring-amber-500
    `,
    outline: `
      bg-white border-amber-600 text-amber-700
      shadow-[3px_3px_0px_0px_rgba(180,83,9)]
      hover:bg-amber-50 hover:shadow-[5px_5px_0px_0px_rgba(180,83,9)]
      active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(180,83,9)]
      focus:ring-amber-500
    `,
    danger: `
      bg-red-500 border-red-700 text-white
      shadow-[3px_3px_0px_0px_rgba(153,27,27)]
      hover:bg-red-600 hover:shadow-[5px_5px_0px_0px_rgba(153,27,27)]
      active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(153,27,27)]
      focus:ring-red-500
    `,
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${widthClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default Button;
