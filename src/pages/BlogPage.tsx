import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getAllPosts } from '../utils/api';
import useAuth from '../hooks/useAuth';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import RetroTerminal from '../components/ui/RetroTerminal';
import BlogPostCard from '../components/ui/BlogPostCard';

const SearchResultsCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.dark}`,
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
  padding: theme.spacing(3),
  transition: 'all 0.5s ease',
}));

const SearchResultsHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  padding: theme.spacing(1.5),
  color: theme.palette.primary.dark,
  fontWeight: 'bold',
  borderBottom: `4px solid ${theme.palette.primary.dark}`,
  marginBottom: theme.spacing(2),
}));

const LoadingCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.dark}`,
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
  padding: theme.spacing(4),
  transition: 'all 0.5s ease',
  textAlign: 'center',
}));

const CtaCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light + '66',
  padding: theme.spacing(3),
  border: `4px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
  textAlign: 'center',
}));

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
  userId: number;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const searchQuery = useMemo(
    () => searchParams.get('search') || '',
    [searchParams]
  );

  // Memoize filtered posts to prevent unnecessary recalculations
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }

    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);
  // Memoize display components to prevent unnecessary re-renders
  const searchResultsHeader = useMemo(() => {
    if (!searchQuery) return null;

    return (
      <Box sx={{ mb: 4 }}>
        <SearchResultsCard
          sx={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <SearchResultsHeader>
            <Typography
              variant="h5"
              sx={{ letterSpacing: '0.1em', fontWeight: 'bold' }}
            >
              SEARCH RESULTS
            </Typography>
          </SearchResultsHeader>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'center' },
              justifyContent: { sm: 'space-between' },
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{ color: 'primary.main', fontFamily: 'monospace' }}
              >
                <Typography component="span" sx={{ color: 'primary.main' }}>
                  {'>'}
                </Typography>{' '}
                Searching for: "
                <Typography
                  component="span"
                  sx={{ fontWeight: 'bold', color: 'primary.dark' }}
                >
                  {searchQuery}
                </Typography>
                "
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'primary.main', mt: 0.5 }}
              >
                Found {filteredPosts.length} result
                {filteredPosts.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
            <Box
              component={Link}
              to="/blog"
              sx={{
                color: 'primary.main',
                '&:hover': { color: 'primary.dark' },
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                textDecoration: 'underline',
              }}
            >
              Clear search
            </Box>
          </Box>
        </SearchResultsCard>
      </Box>
    );
  }, [searchQuery, filteredPosts.length, isLoaded]);
  const loadingComponent = useMemo(
    () => (
      <LoadingCard
        sx={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
        }}
      >
        <SearchResultsHeader sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{ letterSpacing: '0.1em', fontWeight: 'bold' }}
          >
            LOADING POSTS...
          </Typography>
        </SearchResultsHeader>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              border: '8px solid',
              borderColor: 'primary.dark',
              backgroundColor: 'primary.light',
              borderRadius: 1,
              overflow: 'hidden',
              boxShadow: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress
              size={24}
              sx={{
                color: 'background.paper',
              }}
            />
          </Box>
        </Box>
        <Typography sx={{ color: 'primary.main', fontFamily: 'monospace' }}>
          {'>'} Accessing database...
          <Typography
            component="span"
            sx={{
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.5 },
              },
            }}
          >
            _
          </Typography>
        </Typography>
      </LoadingCard>
    ),
    [isLoaded]
  );
  const emptyStateComponent = useMemo(
    () => (
      <LoadingCard
        sx={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
        }}
      >
        <SearchResultsHeader sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{ letterSpacing: '0.1em', fontWeight: 'bold' }}
          >
            {searchQuery ? 'NO RESULTS FOUND' : 'NO POSTS FOUND'}
          </Typography>
        </SearchResultsHeader>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <RetroTerminal title="search-terminal">
            {searchQuery ? (
              <>
                <Typography>
                  {'>'} Search query: "{searchQuery}"
                </Typography>
                <Typography>{'>'} No matches found</Typography>
                <Typography>{'>'} Try different keywords</Typography>
                <Typography sx={{ animation: 'pulse 2s infinite' }}>
                  {'>'} Waiting..._
                </Typography>
              </>
            ) : (
              <>
                <Typography>{'>'} No data found</Typography>
                <Typography>{'>'} Database empty</Typography>
                <Typography sx={{ animation: 'pulse 2s infinite' }}>
                  {'>'} Waiting..._
                </Typography>
              </>
            )}
          </RetroTerminal>
        </Box>
        <Typography sx={{ color: 'primary.main', mb: 3 }}>
          {searchQuery
            ? 'Try searching with different keywords or browse all posts.'
            : 'Be the first to share your retro computing story!'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {searchQuery && (
            <Box component={Link} to="/blog" sx={{ textDecoration: 'none' }}>
              <Button variant="outline">VIEW ALL POSTS</Button>
            </Box>
          )}
          {isAuthenticated ? (
            <Box
              component={Link}
              to="/posts/create"
              sx={{ textDecoration: 'none' }}
            >
              <Button variant="primary">
                {searchQuery ? 'CREATE NEW POST' : 'CREATE FIRST POST'}
              </Button>
            </Box>
          ) : (
            <Box
              component={Link}
              to="/auth/register"
              sx={{ textDecoration: 'none' }}
            >
              <Button variant="primary">JOIN TO POST</Button>
            </Box>
          )}
        </Box>
      </LoadingCard>
    ),
    [searchQuery, isAuthenticated, isLoaded]
  );
  const ctaSection = useMemo(() => {
    if (filteredPosts.length === 0) return null;

    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <CtaCard>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: 'primary.dark', mb: 2 }}
          >
            Join the Conversation
          </Typography>
          <Typography sx={{ color: 'primary.main', mb: 2 }}>
            Have a retro computing story to share? Join our community and start
            writing today!
          </Typography>
          {isAuthenticated ? (
            <Box
              component={Link}
              to="/posts/create"
              sx={{ textDecoration: 'none' }}
            >
              <Button variant="primary" sx={{ px: 4 }}>
                WRITE YOUR STORY
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
              }}
            >
              <Box
                component={Link}
                to="/auth/register"
                sx={{ textDecoration: 'none' }}
              >
                <Button variant="primary" sx={{ px: 3 }}>
                  REGISTER
                </Button>
              </Box>
              <Box
                component={Link}
                to="/auth/login"
                sx={{ textDecoration: 'none' }}
              >
                <Button variant="secondary" sx={{ px: 3 }}>
                  LOGIN
                </Button>
              </Box>
            </Box>
          )}
        </CtaCard>
      </Box>
    );
  }, [filteredPosts.length, isAuthenticated]);

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchPosts = useCallback(async () => {
    try {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.light' + '40',
        fontFamily: 'monospace',
      }}
    >
      <Header isLoaded={isLoaded} />

      <Section id="posts">
        <Container>
          {searchResultsHeader}

          {loading ? (
            loadingComponent
          ) : filteredPosts.length === 0 ? (
            emptyStateComponent
          ) : (
            <Box sx={{ display: 'grid', gap: 4 }}>
              {filteredPosts.map((post, index) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  index={index}
                  isLoaded={isLoaded}
                  setPosts={setPosts}
                />
              ))}
            </Box>
          )}

          {ctaSection}
        </Container>
      </Section>

      <Footer />
    </Box>
  );
};

export default BlogPage;
