import { clsx } from 'clsx';

interface RetroTerminalProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RetroTerminal = ({
  title,
  children,
  className = '',
  size = 'md',
}: RetroTerminalProps) => {
  // Size variants for different use cases
  const sizeClasses = {
    sm: 'w-full max-w-xs sm:max-w-sm',
    md: 'w-full max-w-sm sm:max-w-md md:max-w-lg',
    lg: 'w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl',
  };

  const borderClasses = {
    sm: 'border-4 sm:border-6',
    md: 'border-4 sm:border-6 md:border-8',
    lg: 'border-6 sm:border-8 md:border-10',
  };

  const paddingClasses = {
    sm: 'p-2 sm:p-3',
    md: 'p-3 sm:p-4 md:p-5',
    lg: 'p-4 sm:p-5 md:p-6',
  };

  const textClasses = {
    sm: 'text-xs sm:text-sm',
    md: 'text-xs sm:text-sm md:text-base',
    lg: 'text-sm sm:text-base md:text-lg',
  };

  return (
    <div className="relative w-full flex justify-center">
      <div
        className={clsx(
          'border-amber-800',
          'bg-amber-100',
          'overflow-hidden',
          'shadow-lg sm:shadow-xl md:shadow-2xl',
          'transition-all duration-300',
          'animate-retro-flicker',
          sizeClasses[size],
          borderClasses[size]
        )}
      >
        {/* Terminal Header */}
        <div
          className={clsx(
            'h-4 sm:h-5 md:h-6',
            'bg-amber-800',
            'flex items-center',
            'px-1 sm:px-2 md:px-3'
          )}
        >
          {/* Traffic Light Buttons */}
          <div className={clsx('flex items-center', 'space-x-1 sm:space-x-2')}>
            <div
              className={clsx(
                'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3',
                'rounded-full',
                'bg-red-500'
              )}
            />
            <div
              className={clsx(
                'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3',
                'rounded-full',
                'bg-yellow-500'
              )}
            />
            <div
              className={clsx(
                'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3',
                'rounded-full',
                'bg-green-500'
              )}
            />
          </div>

          {/* Terminal Title */}
          <span
            className={clsx(
              'text-[10px] sm:text-xs md:text-sm',
              'text-white',
              'ml-auto',
              'font-mono',
              'truncate',
              'max-w-[60%]'
            )}
          >
            {title}
          </span>
        </div>

        {/* Terminal Content */}
        <div
          className={clsx(
            // Base styles
            'font-mono',
            'text-amber-800',
            'text-start',
            'leading-relaxed',
            'min-h-[80px] sm:min-h-[100px] md:min-h-[120px]',
            // Size-specific classes
            paddingClasses[size],
            textClasses[size],
            // Custom className
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default RetroTerminal;
