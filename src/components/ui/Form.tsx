import React from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  isSubmitting?: boolean;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  className = '',
  title,
  isSubmitting = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSubmitting) {
      onSubmit(e);
    }
  };

  return (
    <div
      className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] ${className}`}
    >
      {title && (
        <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-3 text-amber-900 font-bold border-b-4 border-amber-700">
          <h2 className="text-xl tracking-wider text-center">{title}</h2>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 min-h-[400px] flex flex-col transition-all duration-300"
      >
        <div className="space-y-6 flex-1">{children}</div>
      </form>
    </div>
  );
};

export default Form;
