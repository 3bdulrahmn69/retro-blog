import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
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

// Styled components
const StyledDialog = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: 16,
}));

const DialogCard = styled(Box)(() => ({
  backgroundColor: '#ffffff',
  border: '4px solid #b45309',
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
  fontFamily: 'Courier New, monospace',
  maxHeight: '90vh',
  overflow: 'hidden',
}));

const DialogHeader = styled(Box)(() => ({
  background: 'linear-gradient(to right, #fbbf24, #d97706)',
  padding: 16,
  color: '#78350f',
  fontWeight: 'bold',
  borderBottom: '4px solid #b45309',
}));

const ConfirmationHeader = styled(Box)(() => ({
  background: 'linear-gradient(to right, #f87171, #dc2626)',
  padding: 16,
  color: '#ffffff',
  fontWeight: 'bold',
  borderBottom: '4px solid #b45309',
}));

const PostContent = styled(Box)(() => ({
  background: 'linear-gradient(to right, #fffbeb, #fef3c7)',
  borderLeft: '4px solid #f59e0b',
  borderRadius: '0 8px 8px 0',
  padding: 24,
  marginBottom: 32,
}));

const CommentCard = styled(Card)(() => ({
  backgroundColor: '#ffffff',
  border: '2px solid #d97706',
  boxShadow: '2px 2px 0px 0px rgba(180,83,9)',
  marginBottom: 16,
}));

const RetroScrollContent = styled(Box)(() => ({
  padding: 24,
  overflowY: 'auto',
  maxHeight: 'calc(90vh - 140px)',
  '&::-webkit-scrollbar': {
    width: 12,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#fef3c7',
    border: '2px solid #d97706',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#d97706',
    border: '2px solid #b45309',
    borderRadius: 0,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#b45309',
  },
}));

const Dialog: React.FC<DialogProps> = (props) => {
  const { isOpen, onClose, title, variant = 'confirmation' } = props;

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
      icon = <WarningIcon sx={{ fontSize: 48, color: '#d97706', mb: 2 }} />,
    } = props;

    return (
      <DialogCard sx={{ maxWidth: 448, width: '100%' }}>
        <ConfirmationHeader>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontSize: '1.125rem',
              fontFamily: 'Courier New, monospace',
              fontWeight: 'bold',
              textAlign: 'center',
              letterSpacing: '0.1em',
            }}
          >
            {title}
          </Typography>
        </ConfirmationHeader>

        <Box sx={{ p: 6 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            {icon}
            <Typography
              variant="body1"
              sx={{
                color: '#92400e',
                lineHeight: 1.6,
                fontFamily: 'Courier New, monospace',
              }}
            >
              {message}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
            }}
          >
            <Button
              variant="outline"
              size="md"
              sx={{ flex: 1 }}
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              variant="danger"
              size="md"
              sx={{ flex: 1 }}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  PROCESSING...
                  <CircularProgress
                    size={16}
                    sx={{
                      color: '#ffffff',
                      ml: 1,
                    }}
                  />
                </Box>
              ) : (
                confirmText
              )}
            </Button>
          </Box>
        </Box>
      </DialogCard>
    );
  };
  // Render content dialog
  const renderContentDialog = (props: ContentDialogProps) => {
    const { post } = props;

    return (
      <DialogCard sx={{ maxWidth: 896, width: '100%' }}>
        <DialogHeader>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                fontFamily: 'Courier New, monospace',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                lineHeight: 1.2,
                flex: 1,
              }}
            >
              {post.title}
            </Typography>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color: '#78350f',
                backgroundColor: '#fef3c7',
                border: '2px solid #92400e',
                boxShadow: '2px 2px 0px 0px rgba(180,83,9)',
                borderRadius: 0,
                p: 0.5,
                '&:hover': {
                  backgroundColor: '#fde68a',
                  boxShadow: '1px 1px 0px 0px rgba(180,83,9)',
                  transform: 'translate(0.5px, 0.5px)',
                },
                '&:active': {
                  transform: 'translate(1px, 1px)',
                  boxShadow: '0px 0px 0px 0px rgba(180,83,9)',
                },
              }}
              aria-label="Close dialog"
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { sm: 'space-between' },
              alignItems: { sm: 'center' },
              gap: 1,
              mt: 3,
              fontSize: '0.875rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                component="span"
                sx={{ fontFamily: 'Courier New, monospace' }}
              >
                By:
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontWeight: 600,
                  fontFamily: 'Courier New, monospace',
                }}
              >
                {post.author || 'Anonymous'}
              </Typography>
            </Box>
            <Chip
              label={
                post.editedAt ? (
                  <Box component="span">
                    EDITED: {formatDate(post.editedAt)}
                  </Box>
                ) : (
                  <Box component="span">
                    POSTED: {formatDate(post.createdAt)}
                  </Box>
                )
              }
              size="small"
              sx={{
                backgroundColor: '#fef3c7',
                color: '#78350f',
                border: '1px solid #d97706',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                borderRadius: 0,
                height: 28,
              }}
            />
          </Box>
        </DialogHeader>

        <RetroScrollContent ref={contentRef}>
          {/* Featured Image */}
          {post.image && (
            <Box sx={{ mb: 6 }}>
              <Box
                component="figure"
                sx={{
                  width: '100%',
                  maxWidth: 512,
                  mx: 'auto',
                  border: '4px solid #d97706',
                  boxShadow: '4px 4px 0px 0px rgba(180,83,9)',
                  overflow: 'hidden',
                  borderRadius: 2,
                  m: 0,
                }}
              >
                <Box
                  component="img"
                  src={post.image}
                  alt={`Featured image for ${post.title}`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>
          )}

          {/* Post Content */}
          <PostContent>
            <Box sx={{ '& > p': { mb: 2 } }}>
              {formatFullContent(post.content).map((paragraph, idx) => (
                <Typography
                  key={idx}
                  variant="body1"
                  component="p"
                  sx={{
                    color: '#92400e',
                    lineHeight: 1.6,
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    '&:last-child': { mb: 0 },
                  }}
                >
                  {paragraph.trim()}
                </Typography>
              ))}
            </Box>
          </PostContent>

          {/* Comments Section */}
          <Box ref={commentsRef} sx={{ borderTop: '4px solid #d97706', pt: 6 }}>
            <Box
              sx={{
                background: 'linear-gradient(to right, #fef3c7, #fef3c7)',
                p: 4,
                border: '2px solid #d97706',
                boxShadow: '4px 4px 0px 0px rgba(180,83,9)',
                mb: 6,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#78350f',
                  letterSpacing: '0.1em',
                  mb: 1,
                  fontFamily: 'Courier New, monospace',
                }}
              >
                💬 COMMENTS ({comments.length})
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#b45309',
                  fontFamily: 'Courier New, monospace',
                }}
              >
                Share your thoughts about this retro tech story!
              </Typography>
            </Box>

            {/* Add Comment Form */}
            {isAuthenticated ? (
              <CommentCard sx={{ mb: 6 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#92400e',
                      fontWeight: 'bold',
                      mb: 3,
                      letterSpacing: '0.1em',
                      fontFamily: 'Courier New, monospace',
                    }}
                  >
                    ADD COMMENT
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                  >
                    <TextField
                      multiline
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      disabled={isSubmittingComment}
                      variant="outlined"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#fffbeb',
                          border: '2px solid #b45309',
                          borderRadius: 0,
                          fontFamily: 'Courier New, monospace',
                          fontSize: '0.875rem',
                          '& fieldset': { border: 'none' },
                          '&:hover fieldset': { border: 'none' },
                          '&.Mui-focused fieldset': { border: 'none' },
                          '&.Mui-focused': {
                            outline: '2px solid #eab308',
                            outlineOffset: '2px',
                          },
                        },
                        '& .MuiInputBase-input': {
                          resize: 'none',
                        },
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleAddComment}
                        disabled={!newComment.trim() || isSubmittingComment}
                      >
                        {isSubmittingComment ? 'POSTING...' : 'POST COMMENT'}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </CommentCard>
            ) : (
              <Box
                sx={{
                  mb: 6,
                  backgroundColor: '#fffbeb',
                  border: '2px solid #d97706',
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: '#b45309',
                    fontFamily: 'Courier New, monospace',
                    mb: 3,
                  }}
                >
                  Please log in to post comments
                </Typography>
                <Button variant="outline" size="sm" onClick={onClose}>
                  CLOSE & LOGIN
                </Button>
              </Box>
            )}

            {/* Comments List */}
            {commentsLoading ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <CircularProgress
                  size={32}
                  sx={{
                    color: '#d97706',
                    mb: 3,
                  }}
                />
                <Typography
                  sx={{
                    color: '#d97706',
                    fontFamily: 'Courier New, monospace',
                  }}
                >
                  Loading comments...
                </Typography>
              </Box>
            ) : comments.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {comments.map((comment) => (
                  <CommentCard key={comment.id}>
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            color: '#92400e',
                            fontFamily: 'Courier New, monospace',
                          }}
                        >
                          {comment.userName || 'Anonymous'}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#d97706',
                            fontFamily: 'Courier New, monospace',
                          }}
                        >
                          {formatCommentDate(comment.createdAt)}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: '#92400e',
                          lineHeight: 1.6,
                          fontFamily: 'inherit',
                        }}
                      >
                        {comment.content}
                      </Typography>
                    </CardContent>
                  </CommentCard>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  backgroundColor: '#fffbeb',
                  border: '2px solid #d97706',
                }}
              >
                <Typography sx={{ fontSize: '2rem', mb: 3 }}>💭</Typography>
                <Typography
                  sx={{
                    color: '#b45309',
                    fontFamily: 'Courier New, monospace',
                  }}
                >
                  No comments yet. Be the first to share your thoughts!
                </Typography>
              </Box>
            )}
          </Box>
        </RetroScrollContent>
      </DialogCard>
    );
  };
  return (
    <StyledDialog onClick={handleBackdropClick}>
      {variant === 'confirmation'
        ? renderConfirmationDialog(props as ConfirmationDialogProps)
        : renderContentDialog(props as ContentDialogProps)}
    </StyledDialog>
  );
};

export default Dialog;
