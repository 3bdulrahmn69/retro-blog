import React, { useEffect, useState, useRef } from 'react';
import Button from './Button';
import useAuth from '../../hooks/useAuth';
import { getCommentsByPostId, addCommentToPost } from '../../utils/api';

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
  scrollToComments?: boolean;
}

interface Comment {
  id: string;
  content: string;
  userId: string;
  userName?: string;
  createdAt: string;
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

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Ref for comments section
  const commentsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load comments when content dialog opens
  useEffect(() => {
    if (isOpen && variant === 'content') {
      const post = (props as ContentDialogProps).post;
      loadComments(post.id.toString());
    }
  }, [isOpen, variant, props]);

  // Scroll to comments when needed
  useEffect(() => {
    if (
      isOpen &&
      variant === 'content' &&
      (props as ContentDialogProps).scrollToComments
    ) {
      // Wait for dialog to fully render then scroll
      const timer = setTimeout(() => {
        if (commentsRef.current && contentRef.current) {
          const dialogContent = contentRef.current;
          const commentsSection = commentsRef.current;

          // Scroll the dialog content to the comments section
          const offsetTop = commentsSection.offsetTop - 100; // Add some padding
          dialogContent.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isOpen, variant, props, commentsLoading]); // Include commentsLoading to ensure comments are loaded

  const loadComments = async (postId: string) => {
    setCommentsLoading(true);
    try {
      const fetchedComments = await getCommentsByPostId(postId);
      setComments(fetchedComments || []);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !isAuthenticated || !user) return;

    const post = (props as ContentDialogProps).post;
    setIsSubmittingComment(true);

    try {
      const commentData = {
        content: newComment.trim(),
        userId: user.id.toString(),
        userName: user.name || 'Anonymous',
      };

      const result = await addCommentToPost(
        post.id.toString(),
        commentData,
        user.token || ''
      );

      if (result) {
        // Add the new comment to the list
        setComments([
          ...comments,
          {
            id: result.id || Date.now().toString(),
            content: newComment.trim(),
            userId: user.id.toString(),
            userName: user.name || 'Anonymous',
            createdAt: new Date().toISOString(),
          },
        ]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Disable/enable page scrolling when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
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

  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
      return `${diffYears}y ago`;
    } else if (diffMonths > 0) {
      return `${diffMonths}mo ago`;
    } else if (diffWeeks > 0) {
      return `${diffWeeks}w ago`;
    } else if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`;
    } else {
      return 'Just now';
    }
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
              className="cursor-pointer text-amber-900 hover:text-amber-700 transition-colors p-1 bg-amber-100 hover:bg-amber-200 border-2 border-amber-800 shadow-[2px_2px_0px_0px_rgba(180,83,9)] hover:shadow-[1px_1px_0px_0px_rgba(180,83,9)] active:translate-x-0.5 active:translate-y-0.5"
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
        <div
          ref={contentRef}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] retro-scroll"
        >
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
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-r-lg p-6 mb-8">
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

          {/* Comments Section */}
          <div ref={commentsRef} className="border-t-4 border-amber-600 pt-6">
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-4 border-2 border-amber-600 shadow-[4px_4px_0px_0px_rgba(180,83,9)] mb-6">
              <h3 className="text-lg font-bold text-amber-900 tracking-wider mb-2">
                💬 COMMENTS ({comments.length})
              </h3>
              <p className="text-amber-700 text-sm">
                Share your thoughts about this retro tech story!
              </p>
            </div>

            {/* Add Comment Form */}
            {isAuthenticated ? (
              <div className="mb-6 bg-white border-2 border-amber-600 shadow-[2px_2px_0px_0px_rgba(180,83,9)] p-4">
                <h4 className="text-amber-800 font-bold mb-3 tracking-wider">
                  ADD COMMENT
                </h4>
                <div className="space-y-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-3 border-2 border-amber-700 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-mono text-sm resize-none"
                    rows={3}
                    disabled={isSubmittingComment}
                  />
                  <div className="flex justify-end">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || isSubmittingComment}
                    >
                      {isSubmittingComment ? 'POSTING...' : 'POST COMMENT'}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6 bg-amber-50 border-2 border-amber-600 p-4 text-center">
                <p className="text-amber-700 font-mono mb-3">
                  Please log in to post comments
                </p>
                <Button variant="outline" size="sm" onClick={onClose}>
                  CLOSE & LOGIN
                </Button>
              </div>
            )}

            {/* Comments List */}
            {commentsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full mx-auto mb-3"></div>
                <p className="text-amber-600 font-mono">Loading comments...</p>
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white border-2 border-amber-600 shadow-[2px_2px_0px_0px_rgba(180,83,9)] p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-amber-800">
                        {comment.userName || 'Anonymous'}
                      </span>
                      <span className="text-xs text-amber-600 font-mono">
                        {formatCommentDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-amber-800 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-amber-50 border-2 border-amber-600">
                <div className="text-4xl mb-3">💭</div>
                <p className="text-amber-700 font-mono">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            )}
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
