import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import { Edit, Delete, MenuBook } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import { deletePost, getAllPosts, getCommentsByPostId } from '../../utils/api';
import Button from './Button';
import Dialog from './Dialog';
import { Link } from 'react-router';
import type { Post } from '../../types/types';
interface BlogPostCardProps {
  post: Post;
  index?: number;
  isLoaded?: boolean;
  setPosts?: (posts: Post[]) => void;
}

const BlogPostCard = ({
  post,
  index = 0,
  isLoaded = true,
  setPosts,
}: BlogPostCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showContentDialog, setShowContentDialog] = useState(false);
  const [scrollToComments, setScrollToComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  // Load comments count when component mounts
  useEffect(() => {
    const loadCommentsCount = async () => {
      try {
        const comments = await getCommentsByPostId(post.id.toString());
        setCommentsCount(comments ? comments.length : 0);
      } catch (error) {
        console.error('Error loading comments count:', error);
        setCommentsCount(0);
      } finally {
        setCommentsLoading(false);
      }
    };

    loadCommentsCount();
  }, [post.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateLong = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (!content) return 'No content available...';

    const cleanContent = content
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (cleanContent.length <= maxLength) return cleanContent;
    return cleanContent.substr(0, maxLength).trim() + '...';
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);

    try {
      const result = await deletePost(post.id.toString(), user?.token || '');
      if (result) {
        const fetchedPosts: Post[] = await getAllPosts();
        if (setPosts) {
          setPosts(fetchedPosts);
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleReadMore = () => {
    setScrollToComments(false);
    setShowContentDialog(true);
  };

  const handleCommentsClick = () => {
    setScrollToComments(true);
    setShowContentDialog(true);
  };

  const handleCloseContentDialog = () => {
    setShowContentDialog(false);
    setScrollToComments(false);
    // Reload comments count when dialog closes (in case new comments were added)
    const loadCommentsCount = async () => {
      try {
        const comments = await getCommentsByPostId(post.id.toString());
        setCommentsCount(comments ? comments.length : 0);
      } catch (error) {
        console.error('Error reloading comments count:', error);
      }
    };
    loadCommentsCount();
  };

  const shouldShowReadMore = post.content && post.content.length > 150;
  const isPostOwner =
    isAuthenticated && Number(user?.id) === Number(post.userId);
  const hasValidImage = post.image && !imageError;
  return (
    <>
      <Card
        component="article"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          border: { xs: 2, sm: 4 },
          borderColor: 'primary.dark',
          boxShadow: {
            xs: '4px 4px 0px 0px rgba(180,83,9)',
            sm: '8px 8px 0px 0px rgba(180,83,9)',
          },
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(2rem)',
          transition: 'all 0.5s ease',
          transitionDelay: `${index * 100}ms`,
          '&:hover': {
            '& .post-image': {
              transform: 'scale(1.05)',
            },
          },
        }}
        role="article"
        aria-labelledby={`post-title-${post.id}`}
      >
        {/* Post Header */}
        <CardHeader
          sx={{
            background: 'linear-gradient(to right, #fbbf24, #d97706)',
            color: 'primary.dark',
            fontWeight: 700,
            borderBottom: { xs: 2, sm: 4 },
            borderColor: 'primary.dark',
            p: { xs: 2, sm: 3 },
          }}
          title={
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { sm: 'space-between' },
                alignItems: { sm: 'flex-start' },
                gap: 1,
              }}
            >
              <Typography
                id={`post-title-${post.id}`}
                variant="h6"
                component="h2"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.125rem', lg: '1.25rem' },
                  letterSpacing: '0.1em',
                  lineHeight: 1.2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
                title={post.title}
              >
                {post.title}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.75rem',
                }}
              >
                {post.editedAt ? (
                  <Chip
                    label={
                      <Box component="span">
                        edited -{' '}
                        <time
                          dateTime={post.editedAt}
                          title={formatDateLong(post.editedAt)}
                        >
                          {formatDate(post.editedAt)}
                        </time>
                      </Box>
                    }
                    size="small"
                    sx={{
                      display: { xs: 'none', sm: 'flex' },
                      backgroundColor: 'primary.light',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                    }}
                  />
                ) : (
                  <Chip
                    label={
                      <time
                        dateTime={post.createdAt}
                        title={formatDateLong(post.createdAt)}
                      >
                        {formatDate(post.createdAt)}
                      </time>
                    }
                    size="small"
                    sx={{
                      display: { xs: 'none', sm: 'flex' },
                      backgroundColor: 'primary.light',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                    }}
                  />
                )}
              </Box>
            </Box>
          }
        />

        <CardContent sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>
          {/* Mobile Image */}
          {hasValidImage && (
            <Box sx={{ mb: 3, display: { lg: 'none' } }}>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  height: { xs: '192px', sm: '224px' },
                  border: { xs: 2, sm: 4 },
                  borderColor: 'primary.main',
                  boxShadow: {
                    xs: '2px 2px 0px 0px rgba(180,83,9)',
                    sm: '4px 4px 0px 0px rgba(180,83,9)',
                  },
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  className="post-image"
                  src={post.image}
                  alt={`Featured image for ${post.title}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  onError={handleImageError}
                  loading="lazy"
                />
              </Paper>
            </Box>
          )}

          {/* Content Layout */}
          <Box
            sx={{
              display: hasValidImage ? { lg: 'grid' } : 'block',
              gridTemplateColumns: hasValidImage
                ? { lg: '2fr 3fr' }
                : undefined,
              gap: hasValidImage ? { lg: 3 } : undefined,
            }}
          >
            {/* Desktop Image */}
            {hasValidImage && (
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Paper
                  elevation={0}
                  sx={{
                    width: '100%',
                    height: { lg: '256px', xl: '288px' },
                    border: 4,
                    borderColor: 'primary.main',
                    boxShadow: '4px 4px 0px 0px rgba(180,83,9)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    className="post-image"
                    src={post.image}
                    alt={`Featured image for ${post.title}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    onError={handleImageError}
                    loading="lazy"
                  />
                </Paper>
              </Box>
            )}

            {/* Content Section */}
            <Box>
              {/* Meta Information */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: { sm: 'space-between' },
                  alignItems: { sm: 'flex-start' },
                  mb: 2,
                  fontSize: '0.875rem',
                  color: 'primary.main',
                  gap: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    By:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: 'primary.dark' }}
                  >
                    {post.author || 'Anonymous'}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  component="time"
                  dateTime={post.createdAt}
                  title={formatDateLong(post.createdAt)}
                  sx={{
                    display: { lg: 'none' },
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                  }}
                >
                  {formatDate(post.createdAt)}
                </Typography>
              </Box>

              {/* Content Preview */}
              <Paper
                elevation={0}
                sx={{
                  background: 'linear-gradient(to right, #fffbeb, #fefce8)',
                  borderLeft: 4,
                  borderColor: 'secondary.main',
                  mb: 3,
                  borderRadius: '0 0.5rem 0.5rem 0',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.dark',
                      lineHeight: 1.6,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    {truncateContent(post.content)}
                  </Typography>
                </Box>

                {/* Gradient overlay for truncated content */}
                {shouldShowReadMore && (
                  <Box
                    sx={{
                      height: '1.5rem',
                      background:
                        'linear-gradient(to top, #fefce8, transparent)',
                    }}
                  />
                )}
              </Paper>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Read More Button */}
                {shouldShowReadMore && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReadMore}
                    sx={{
                      width: { xs: '100%', sm: 'auto' },
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <MenuBook sx={{ mr: 1, fontSize: '1rem' }} />
                    READ FULL POST
                  </Button>
                )}

                {/* Owner Actions */}
                {isPostOwner && (
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      pt: 2,
                      borderTop: 2,
                      borderColor: 'primary.light',
                    }}
                  >
                    <Link
                      to={`/posts/edit/${post.id}`}
                      style={{ flex: 1, textDecoration: 'none' }}
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        disabled={isDeleting}
                        sx={{
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '4px 4px 0px 0px rgba(180,83,9)',
                          },
                          '&:active': {
                            transform: 'translate(1px, 1px)',
                            boxShadow: '2px 2px 0px 0px rgba(180,83,9)',
                          },
                        }}
                        startIcon={<Edit />}
                      >
                        EDIT POST
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={handleDeleteClick}
                      disabled={isDeleting}
                      sx={{
                        flex: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                        '&:active': {
                          transform: 'translate(1px, 1px)',
                        },
                      }}
                      startIcon={<Delete />}
                    >
                      DELETE POST
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Post Stats */}
              <Divider sx={{ mt: 2, borderColor: 'primary.light' }} />
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 2,
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  fontFamily: 'monospace',
                }}
              >
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  📖 {Math.ceil(post.content.split(' ').length / 200)} min read
                </Typography>
                <Box
                  component="button"
                  onClick={handleCommentsClick}
                  sx={{
                    background: 'none',
                    border: 'none',
                    color: 'text.secondary',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    p: 0.5,
                    borderRadius: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'primary.dark',
                      backgroundColor: 'primary.light',
                      '& .emoji': {
                        transform: 'scale(1.1)',
                      },
                    },
                    '&:focus': {
                      outline: 2,
                      outlineColor: 'secondary.main',
                      outlineOffset: 1,
                    },
                  }}
                  title="View comments"
                  aria-label={`View ${commentsCount} comment${
                    commentsCount !== 1 ? 's' : ''
                  } for ${post.title}`}
                >
                  <Box
                    component="span"
                    className="emoji"
                    sx={{ transition: 'transform 0.2s ease' }}
                  >
                    💬
                  </Box>
                  <Box component="span">
                    {commentsLoading ? '...' : commentsCount} comment
                    {commentsCount !== 1 ? 's' : ''}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Post Content Dialog */}
      <Dialog
        variant="content"
        isOpen={showContentDialog}
        onClose={handleCloseContentDialog}
        title={post.title}
        post={post}
        scrollToComments={scrollToComments}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        variant="confirmation"
        isOpen={showDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="DELETE POST"
        message={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
        confirmText="DELETE"
        cancelText="CANCEL"
        isLoading={isDeleting}
      />
    </>
  );
};

export default BlogPostCard;
