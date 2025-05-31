import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import { getPostById, createPost, updatePost } from '../utils/api';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { validateRequired } from '../utils/validation';
import type { Post } from '../types/types';

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
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] p-8">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
            <span className="font-mono text-amber-800">
              Loading post data...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 font-mono relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Link
          to="/blog"
          className="inline-block bg-amber-100 border-2 border-amber-700 shadow-[4px_4px_0px_0px_rgba(180,83,9)] px-4 py-2 text-amber-800 font-bold hover:bg-amber-200 transition-all duration-200 transform hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(180,83,9)]"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">
            {mod === 'create' ? 'CREATE NEW POST' : 'EDIT POST'}
          </h1>
          <p className="text-amber-600 font-mono">
            {mod === 'create'
              ? 'Share your retro computing thoughts with the community'
              : 'Update your post with new information'}
          </p>
        </div>

        <Form
          title={mod === 'create' ? 'NEW POST' : 'EDIT POST'}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          className="w-full"
        >
          <div className="grid gap-6">
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
            <div className="space-y-4">
              <Input
                label="Featured Image URL (Optional)"
                value={postData.image}
                onChange={handleImageChange}
                placeholder="https://example.com/image.jpg"
              />

              {/* Image Preview Section */}
              {postData.image.trim() && (
                <div className="space-y-2">
                  <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm">
                    Image Preview
                  </label>

                  <div className="relative">
                    <div className="w-full max-w-md mx-auto border-4 border-amber-600 shadow-[4px_4px_0px_0px_rgba(180,83,9)] overflow-hidden rounded-lg bg-amber-50">
                      {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-amber-50 bg-opacity-75">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>
                            <span className="text-amber-700 text-sm font-mono">
                              Loading image...
                            </span>
                          </div>
                        </div>
                      )}

                      {!imagePreviewError ? (
                        <img
                          src={postData.image}
                          alt="Preview"
                          className="w-full h-48 object-cover transition-opacity duration-300"
                          onLoad={handleImageLoad}
                          onError={handleImageError}
                          style={{ opacity: imageLoading ? 0.5 : 1 }}
                        />
                      ) : (
                        <div className="w-full h-48 flex flex-col items-center justify-center bg-red-50 text-red-600">
                          <div className="text-3xl mb-2">❌</div>
                          <p className="text-sm font-mono text-center px-4">
                            Failed to load image. Please check the URL.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm">
                Post Content
                <span className="text-red-600 ml-1">*</span>
              </label>
              <textarea
                value={postData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Write your retro computing story, memories, or technical insights here. Use double line breaks to separate paragraphs."
                rows={12}
                className={`w-full px-3 py-2 bg-amber-50 border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-mono transition-colors resize-vertical ${
                  validationErrors.content
                    ? 'border-red-600 focus:border-red-600 focus:ring-red-500'
                    : 'border-amber-700'
                }`}
              />
              {validationErrors.content && (
                <p className="text-red-600 text-sm font-mono bg-red-50 border border-red-200 px-2 py-1 rounded">
                  {'>'} {validationErrors.content}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
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
                className="flex-1"
                onClick={() => navigate('/blog')}
                disabled={isSubmitting}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ControlPostsPage;
