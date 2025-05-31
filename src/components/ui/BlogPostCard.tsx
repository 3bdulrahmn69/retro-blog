import { useState, useEffect } from 'react';
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
              {post.editedAt ? (
                <div className="hidden sm:block bg-amber-100 px-2 py-1 font-mono">
                  <span>edited- </span>
                  <time
                    dateTime={post.editedAt}
                    title={formatDateLong(post.editedAt)}
                  >
                    {formatDate(post.editedAt)}
                  </time>
                </div>
              ) : (
                <time
                  dateTime={post.createdAt}
                  className="hidden sm:block bg-amber-100 px-2 py-1 font-mono"
                  title={formatDateLong(post.createdAt)}
                >
                  {formatDate(post.createdAt)}
                </time>
              )}
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

              {/* Content Preview */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 mb-5 rounded-r-lg overflow-hidden">
                <div className="p-4 sm:p-5">
                  <p className="text-amber-800 leading-relaxed text-sm sm:text-base">
                    {truncateContent(post.content)}
                  </p>
                </div>

                {/* Gradient overlay for truncated content */}
                {shouldShowReadMore && (
                  <div className="h-6 bg-gradient-to-t from-yellow-50 to-transparent" />
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Read More Button */}
                {shouldShowReadMore && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto transition-all duration-300 hover:scale-105"
                    onClick={handleReadMore}
                  >
                    <span className="mr-2">📖</span>
                    READ FULL POST
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
                      onClick={handleDeleteClick}
                      aria-label={`Delete post: ${post.title}`}
                      disabled={isDeleting}
                    >
                      <span className="font-bold tracking-wider">
                        DELETE POST
                      </span>
                    </Button>
                  </div>
                )}
              </div>

              {/* Post Stats */}
              <div className="mt-4 pt-3 border-t border-amber-100 flex flex-wrap items-center gap-4 text-xs text-amber-500 font-mono">
                <span>
                  📖 {Math.ceil(post.content.split(' ').length / 200)} min read
                </span>
                <button
                  onClick={handleCommentsClick}
                  className="group/comments hover:text-amber-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 rounded px-1 py-0.5 hover:bg-amber-50"
                  title="View comments"
                  aria-label={`View ${commentsCount} comment${
                    commentsCount !== 1 ? 's' : ''
                  } for ${post.title}`}
                >
                  <span className="group-hover/comments:scale-110 transition-transform inline-block">
                    💬
                  </span>{' '}
                  <span className="group-hover/comments:underline">
                    {commentsLoading ? '...' : commentsCount} comment
                    {commentsCount !== 1 ? 's' : ''}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

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
