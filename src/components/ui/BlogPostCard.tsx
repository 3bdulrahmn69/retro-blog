import { useState } from 'react';
import { useAuth } from '../../context/AuthContext ';
import { deletePost } from '../../utils/api';
import Button from './Button';
import { Link } from 'react-router';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
  userId: number;
}

interface BlogPostCardProps {
  post: Post;
  index?: number;
  isLoaded?: boolean;
}

const BlogPostCard = ({
  post,
  index = 0,
  isLoaded = true,
}: BlogPostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAuthenticated, user } = useAuth();

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

  const formatFullContent = (content: string) => {
    if (!content) return ['No content available...'];

    const paragraphs = content.split('\n\n').filter((p) => p.trim());
    return paragraphs.length > 0 ? paragraphs : [content];
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this post? This action can be undone later.'
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deletePost(post.id.toString(), user?.token || '');
      if (result) {
        // Optionally refresh the page or remove the post from the UI
        window.location.reload();
      } else {
        alert('Failed to delete post. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowReadMore = post.content && post.content.length > 150;
  const isPostOwner =
    isAuthenticated && Number(user?.id) === Number(post.userId);
  const hasValidImage = post.image && !imageError;

  return (
    <article
      className={`group bg-white border-2 sm:border-4 border-amber-700 shadow-[4px_4px_0px_0px_rgba(180,83,9)] sm:shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-500 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      role="article"
      aria-labelledby={`post-title-${post.id}`}
    >
      {/* Post Header */}
      <header className="bg-gradient-to-r from-yellow-400 to-amber-600 p-3 sm:p-4 text-amber-900 font-bold border-b-2 sm:border-b-4 border-amber-700">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <h2
            id={`post-title-${post.id}`}
            className="text-base sm:text-lg lg:text-xl tracking-wider leading-tight"
            title={post.title}
          >
            {post.title}
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <time
              dateTime={post.createdAt}
              className="hidden sm:block bg-amber-100 px-2 py-1 font-mono"
              title={formatDateLong(post.createdAt)}
            >
              {formatDate(post.createdAt)}
            </time>
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-5 lg:p-6">
        {/* Mobile Image */}
        {hasValidImage && (
          <div className="mb-5 lg:hidden">
            <figure className="w-full h-48 sm:h-56 border-2 sm:border-4 border-amber-600 shadow-[2px_2px_0px_0px_rgba(180,83,9)] sm:shadow-[4px_4px_0px_0px_rgba(180,83,9)] overflow-hidden">
              <img
                src={post.image}
                alt={`Featured image for ${post.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
                loading="lazy"
              />
            </figure>
          </div>
        )}

        {/* Content Layout */}
        <div
          className={`${
            hasValidImage ? 'lg:grid lg:grid-cols-5 lg:gap-6' : ''
          }`}
        >
          {/* Desktop Image */}
          {hasValidImage && (
            <figure className="hidden lg:block lg:col-span-2">
              <div className="w-full h-64 xl:h-72 border-4 border-amber-600 shadow-[4px_4px_0px_0px_rgba(180,83,9)] overflow-hidden">
                <img
                  src={post.image}
                  alt={`Featured image for ${post.title}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            </figure>
          )}

          {/* Content Section */}
          <div className={`${hasValidImage ? 'lg:col-span-3' : ''}`}>
            {/* Meta Information */}
            <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start mb-4 text-sm text-amber-600 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono">By:</span>
                <span className="font-semibold text-amber-700">
                  {post.author || 'Anonymous'}
                </span>
              </div>
              <time
                dateTime={post.createdAt}
                className="lg:hidden font-mono text-xs text-amber-500"
                title={formatDateLong(post.createdAt)}
              >
                {formatDate(post.createdAt)}
              </time>
            </div>

            {/* Content with Height Animation */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 mb-5 rounded-r-lg overflow-hidden">
              <div className="p-4 sm:p-5">
                <div
                  className={`transition-all duration-700 ease-in-out overflow-hidden ${
                    isExpanded
                      ? 'max-h-[1000px] opacity-100'
                      : 'max-h-20 opacity-90'
                  }`}
                  style={{
                    transitionTimingFunction: isExpanded
                      ? 'cubic-bezier(0.4, 0, 0.2, 1)'
                      : 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {isExpanded ? (
                    <div className="space-y-4" id={`post-content-${post.id}`}>
                      {formatFullContent(post.content).map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-amber-800 leading-relaxed text-sm sm:text-base"
                        >
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-amber-800 leading-relaxed text-sm sm:text-base">
                      {truncateContent(post.content)}
                    </p>
                  )}
                </div>
              </div>

              {/* Gradient overlay for collapsed state */}
              {!isExpanded && shouldShowReadMore && (
                <div
                  className="h-6 bg-gradient-to-t from-yellow-50 to-transparent transition-all duration-700 ease-in-out"
                  style={{
                    opacity: isExpanded ? 0 : 1,
                    transform: isExpanded
                      ? 'translateY(-10px)'
                      : 'translateY(0)',
                  }}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Read More Button with Animation */}
              {shouldShowReadMore && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto transition-all duration-300 hover:scale-105"
                  onClick={toggleExpanded}
                  aria-expanded={isExpanded}
                  aria-controls={`post-content-${post.id}`}
                >
                  <span
                    className={`mr-2 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    ↓
                  </span>
                  {isExpanded ? 'SHOW LESS' : 'CONTINUE READING'}
                </Button>
              )}

              {/* Owner Actions */}
              {isPostOwner && (
                <div className="flex flex-row gap-3 pt-4 border-t-2 border-amber-200">
                  <Link to={`/posts/edit/${post.id}`} className="flex-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full transition-all duration-200 hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(180,83,9)] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(180,83,9)]"
                      aria-label={`Edit post: ${post.title}`}
                      disabled={isDeleting}
                    >
                      <span className="font-bold tracking-wider">
                        EDIT POST
                      </span>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    className="flex-1 transition-all duration-200 hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(153,27,27)] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(153,27,27)]"
                    onClick={handleDelete}
                    aria-label={`Delete post: ${post.title}`}
                    disabled={isDeleting}
                  >
                    <span className="font-bold tracking-wider">
                      {isDeleting ? 'DELETING...' : 'DELETE POST'}
                    </span>
                    {isDeleting && (
                      <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Reading Time Estimate */}
            {post.content && (
              <div className="mt-4 pt-3 border-t border-amber-100">
                <span className="text-xs text-amber-500 font-mono">
                  📖 {Math.ceil(post.content.split(' ').length / 200)} min read
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
