import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { getPostById, createPost, updatePost } from '../utils/api';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { validateRequired } from '../utils/validation';
import type { Post } from '../types/types';

const BackButton = styled(Link)(({ theme }: { theme: Theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  display: 'inline-block',
  backgroundColor: theme.palette.primary.light + '80',
  border: `2px solid ${theme.palette.primary.dark}`,
  boxShadow: '4px 4px 0px 0px rgba(180,83,9)',
  padding: theme.spacing(1, 2),
  color: theme.palette.primary.dark,
  fontWeight: 'bold',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    transform: 'translate(4px, 4px)',
    boxShadow: '2px 2px 0px 0px rgba(180,83,9)',
  },
}));

const LoadingContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.dark}`,
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
  padding: theme.spacing(4),
}));

const ImagePreviewContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: '24rem',
  margin: '0 auto',
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: '4px 4px 0px 0px rgba(180,83,9)',
  overflow: 'hidden',
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.primary.light + '40',
}));

const ContentTextarea = styled('textarea', {
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError?: boolean }>(({ theme, hasError }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.light + '40',
  border: `2px solid ${hasError ? '#dc2626' : theme.palette.primary.dark}`,
  fontFamily: 'monospace',
  transition: 'all 0.2s ease',
  resize: 'vertical',
  '&:focus': {
    outline: 'none',
    borderColor: hasError ? '#dc2626' : theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${
      hasError ? '#fca5a5' : theme.palette.primary.light
    }`,
  },
}));

interface PostData {
  title: string;
  content: string;
  image: string;
  author: string;
}

const ControlPostsPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Determine mode based on the URL path
  const isEditMode = location.pathname.includes('/edit/');
  const [mod, setMod] = useState<'create' | 'edit'>(
    isEditMode ? 'edit' : 'create'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    image: '',
    author: user?.name || '',
  });

  const [validationErrors, setValidationErrors] = useState({
    title: '',
    content: '',
    author: '',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  // Determine mode and load post data if editing
  useEffect(() => {
    const initializePage = async () => {
      if (isEditMode && id) {
        setMod('edit');
        setIsLoading(true);

        try {
          const post = await getPostById(id);
          if (post) {
            // Check if user owns this post
            if (Number(post.userId) !== Number(user?.id)) {
              navigate('/blog');
              return;
            }

            setPostData({
              title: post.title || '',
              content: post.content || '',
              image: post.image || '',
              author: post.author || user?.name || '',
            });
          } else {
            navigate('/blog');
          }
        } catch (error) {
          console.error('Error loading post:', error);
          navigate('/blog');
        } finally {
          setIsLoading(false);
        }
      } else {
        // Create mode
        setMod('create');
        setPostData({
          title: '',
          content: '',
          image: '',
          author: user?.name || '',
        });
      }
    };

    if (user) {
      initializePage();
    }
  }, [id, user, navigate, isEditMode]);

  // Validation functions
  const validateForm = (): boolean => {
    const errors = { title: '', content: '', author: '' };
    let isValid = true;

    const titleValidation = validateRequired(postData.title, 'Title');
    if (!titleValidation.isValid) {
      errors.title = titleValidation.message;
      isValid = false;
    }

    const contentValidation = validateRequired(postData.content, 'Content');
    if (!contentValidation.isValid) {
      errors.content = contentValidation.message;
      isValid = false;
    }

    const authorValidation = validateRequired(postData.author, 'Author');
    if (!authorValidation.isValid) {
      errors.author = authorValidation.message;
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  // Handle input changes with real-time validation
  const handleTitleChange = (title: string) => {
    setPostData({ ...postData, title });
    if (title.trim()) {
      const titleValidation = validateRequired(title, 'Title');
      setValidationErrors((prev) => ({
        ...prev,
        title: titleValidation.isValid ? '' : titleValidation.message,
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const handleContentChange = (content: string) => {
    setPostData({ ...postData, content });
    if (content.trim()) {
      const contentValidation = validateRequired(content, 'Content');
      setValidationErrors((prev) => ({
        ...prev,
        content: contentValidation.isValid ? '' : contentValidation.message,
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, content: '' }));
    }
  };

  const handleAuthorChange = (author: string) => {
    setPostData({ ...postData, author });
    if (author.trim()) {
      const authorValidation = validateRequired(author, 'Author');
      setValidationErrors((prev) => ({
        ...prev,
        author: authorValidation.isValid ? '' : authorValidation.message,
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, author: '' }));
    }
  };

  const handleImageChange = (image: string) => {
    setPostData({ ...postData, image });
    // Reset image preview states when URL changes
    setImagePreviewError(false);
    if (image.trim()) {
      setImageLoading(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImagePreviewError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImagePreviewError(true);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const postPayload = {
        id: mod === 'create' ? Date.now() : Number(id),
        ...postData,
        userId: Number(user?.id),
        createdAt:
          mod === 'create'
            ? new Date().toISOString()
            : (postData as Post).createdAt || new Date().toISOString(),
      };

      let result;
      if (mod === 'create') {
        result = await createPost(postPayload, user?.token || '');
      } else {
        result = await updatePost(id!, postPayload, user?.token || '');
      }

      if (result) {
        navigate('/blog');
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          title: `Failed to ${mod} post. Please try again.`,
        }));
      }
    } catch (error) {
      console.error(`Error ${mod}ing post:`, error);
      setValidationErrors((prev) => ({
        ...prev,
        title: `Error ${mod}ing post. Please try again.`,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'primary.light' + '40',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadingContainer>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CircularProgress size={24} sx={{ color: 'primary.main' }} />
            <Typography sx={{ fontFamily: 'monospace', color: 'primary.dark' }}>
              Loading post data...
            </Typography>
          </Box>
        </LoadingContainer>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.light' + '40',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        fontFamily: 'monospace',
        position: 'relative',
      }}
    >
      {/* Back Button */}
      <BackButton to="/blog">← Back to Blog</BackButton>

      {/* Main Content */}
      <Box sx={{ width: '100%', maxWidth: '64rem' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', color: 'primary.dark', mb: 1 }}
          >
            {mod === 'create' ? 'CREATE NEW POST' : 'EDIT POST'}
          </Typography>
          <Typography sx={{ color: 'primary.main', fontFamily: 'monospace' }}>
            {mod === 'create'
              ? 'Share your retro computing thoughts with the community'
              : 'Update your post with new information'}
          </Typography>
        </Box>

        <Form
          title={mod === 'create' ? 'NEW POST' : 'EDIT POST'}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          sx={{ width: '100%' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Input
              label="Post Title"
              value={postData.title}
              onChange={handleTitleChange}
              error={validationErrors.title}
              placeholder="Enter an engaging title for your post"
              required
            />

            <Input
              label="Author Name"
              value={postData.author}
              onChange={handleAuthorChange}
              error={validationErrors.author}
              placeholder="Your name or pseudonym"
              required
              disabled={true}
            />

            {/* Image URL Input with Preview */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Input
                label="Featured Image URL (Optional)"
                value={postData.image}
                onChange={handleImageChange}
                placeholder="https://example.com/image.jpg"
              />

              {/* Image Preview Section */}
              {postData.image.trim() && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography
                    component="label"
                    sx={{
                      color: 'primary.dark',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontSize: '0.875rem',
                    }}
                  >
                    Image Preview
                  </Typography>

                  <Box sx={{ position: 'relative' }}>
                    <ImagePreviewContainer>
                      {imageLoading && (
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'primary.light' + '60',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <CircularProgress
                              size={20}
                              sx={{ color: 'primary.main' }}
                            />
                            <Typography
                              sx={{
                                color: 'primary.main',
                                fontSize: '0.875rem',
                                fontFamily: 'monospace',
                              }}
                            >
                              Loading image...
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      {!imagePreviewError ? (
                        <Box
                          component="img"
                          src={postData.image}
                          alt="Preview"
                          sx={{
                            width: '100%',
                            height: '12rem',
                            objectFit: 'cover',
                            transition: 'opacity 0.3s ease',
                            opacity: imageLoading ? 0.5 : 1,
                          }}
                          onLoad={handleImageLoad}
                          onError={handleImageError}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: '100%',
                            height: '12rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                          }}
                        >
                          <Typography sx={{ fontSize: '3rem', mb: 1 }}>
                            ❌
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '0.875rem',
                              fontFamily: 'monospace',
                              textAlign: 'center',
                              px: 2,
                            }}
                          >
                            Failed to load image. Please check the URL.
                          </Typography>
                        </Box>
                      )}
                    </ImagePreviewContainer>
                  </Box>
                </Box>
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography
                component="label"
                sx={{
                  color: 'primary.dark',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.875rem',
                }}
              >
                Post Content
                <Box component="span" sx={{ color: '#dc2626', ml: 0.5 }}>
                  *
                </Box>
              </Typography>{' '}
              <ContentTextarea
                value={postData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Write your retro computing story, memories, or technical insights here. Use double line breaks to separate paragraphs."
                rows={12}
                hasError={!!validationErrors.content}
              />
              {validationErrors.content && (
                <Typography
                  sx={{
                    color: '#dc2626',
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fca5a5',
                    px: 1,
                    py: 0.5,
                    borderRadius: 0.5,
                  }}
                >
                  {'>'} {validationErrors.content}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1.5,
                pt: 2,
              }}
            >
              <Button type="submit" disabled={isSubmitting} sx={{ flex: 1 }}>
                {isSubmitting
                  ? mod === 'create'
                    ? 'CREATING...'
                    : 'UPDATING...'
                  : mod === 'create'
                  ? 'CREATE POST'
                  : 'UPDATE POST'}
              </Button>
              <Button
                variant="outline"
                sx={{ flex: 1 }}
                onClick={() => navigate('/blog')}
                disabled={isSubmitting}
              >
                CANCEL
              </Button>
            </Box>
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default ControlPostsPage;
