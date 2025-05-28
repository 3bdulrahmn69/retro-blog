import React, { useEffect } from 'react';
import Button from './Button';

interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  variant?: 'confirmation' | 'content';
  className?: string;
}

interface ConfirmationDialogProps extends BaseDialogProps {
  variant: 'confirmation';
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

interface ContentDialogProps extends BaseDialogProps {
  variant: 'content';
  post: {
    id: number;
    title: string;
    content: string;
    author: string;
    image?: string;
    createdAt: string;
    editedAt?: string;
  };
}

type DialogProps = ConfirmationDialogProps | ContentDialogProps;

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    isOpen,
    onClose,
    title,
    variant = 'confirmation',
    className = '',
  } = props;

  // Disable/enable page scrolling when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Disable scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // Re-enable scrolling and restore scroll position
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatFullContent = (content: string) => {
    if (!content) return ['No content available...'];
    const paragraphs = content.split('\n\n').filter((p) => p.trim());
    return paragraphs.length > 0 ? paragraphs : [content];
  };

  // Render confirmation dialog
  const renderConfirmationDialog = (props: ConfirmationDialogProps) => {
    const {
      message,
      onConfirm,
      confirmText = 'CONFIRM',
      cancelText = 'CANCEL',
      isLoading = false,
      icon = <div className="text-4xl mb-4">⚠️</div>,
    } = props;

    return (
      <div className="bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] max-w-md w-full font-mono">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-400 to-red-600 p-3 text-white font-bold border-b-4 border-amber-700">
          <h3 className="text-lg tracking-wider text-center">{title}</h3>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            {icon}
            <p className="text-amber-800 leading-relaxed">{message}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              variant="danger"
              size="md"
              className="flex-1"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'PROCESSING...' : confirmText}
              {isLoading && (
                <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Render content dialog
  const renderContentDialog = (props: ContentDialogProps) => {
    const { post } = props;

    return (
      <div className="bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] max-w-4xl w-full max-h-[90vh] overflow-hidden font-mono">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-4 text-amber-900 font-bold border-b-4 border-amber-700">
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-lg md:text-xl tracking-wider leading-tight flex-1">
              {post.title}
            </h2>
            <button
              onClick={onClose}
              className="text-amber-900 hover:text-amber-700 transition-colors p-1 bg-amber-100 hover:bg-amber-200 border-2 border-amber-800 shadow-[2px_2px_0px_0px_rgba(180,83,9)] hover:shadow-[1px_1px_0px_0px_rgba(180,83,9)] active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Close dialog"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Meta Information */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-mono">By:</span>
              <span className="font-semibold">
                {post.author || 'Anonymous'}
              </span>
            </div>
            <div className="text-xs bg-amber-100 px-2 py-1 border border-amber-600 font-mono">
              {post.editedAt ? (
                <>
                  <span>EDITED: </span>
                  <time dateTime={post.editedAt}>
                    {formatDate(post.editedAt)}
                  </time>
                </>
              ) : (
                <>
                  <span>POSTED: </span>
                  <time dateTime={post.createdAt}>
                    {formatDate(post.createdAt)}
                  </time>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Featured Image */}
          {post.image && (
            <div className="mb-6">
              <figure className="w-full max-w-2xl mx-auto border-4 border-amber-600 shadow-[4px_4px_0px_0px_rgba(180,83,9)] overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={`Featured image for ${post.title}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </figure>
            </div>
          )}

          {/* Post Content */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-r-lg p-6">
            <div className="space-y-4">
              {formatFullContent(post.content).map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-amber-800 leading-relaxed text-base"
                >
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* Reading Time */}
          <div className="mt-6 pt-4 border-t border-amber-200 text-center">
            <div className="bg-amber-100 border-2 border-amber-600 shadow-[2px_2px_0px_0px_rgba(180,83,9)] inline-block px-4 py-2">
              <span className="text-sm text-amber-700 font-mono font-bold">
                📖 {Math.ceil(post.content?.split(' ').length / 200 || 1)} MIN
                READ
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 ${className}`}
      onClick={handleBackdropClick}
    >
      {variant === 'confirmation'
        ? renderConfirmationDialog(props as ConfirmationDialogProps)
        : renderContentDialog(props as ContentDialogProps)}
    </div>
  );
};

export default Dialog;
