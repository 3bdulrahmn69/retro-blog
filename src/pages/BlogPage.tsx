import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getAllPosts } from '../utils/api';
import { useAuth } from '../context/AuthContext ';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import RetroTerminal from '../components/ui/RetroTerminal';
import BlogPostCard from '../components/ui/BlogPostCard';

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
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts || []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 font-mono">
      <Header isLoaded={isLoaded} />

      <Section id="posts">
        <Container>
          {loading ? (
            <div className="text-center">
              <div
                className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] p-8 transition-all duration-500 ${
                  isLoaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 font-bold border-b-4 border-amber-700 mb-6">
                  <h3 className="text-xl tracking-wider">LOADING POSTS...</h3>
                </div>
                <div className="flex justify-center">
                  <div className="w-16 h-16 border-8 border-amber-800 bg-amber-100 rounded-lg overflow-hidden shadow-lg">
                    <div className="h-full bg-amber-800 flex items-center justify-center">
                      <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-amber-700 mt-4 font-mono">
                  {'>'} Accessing database...
                  <span className="animate-pulse">_</span>
                </p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center">
              <div
                className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] p-8 transition-all duration-500 ${
                  isLoaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 font-bold border-b-4 border-amber-700 mb-6">
                  <h3 className="text-xl tracking-wider">NO POSTS FOUND</h3>
                </div>
                <div className="flex justify-center mb-6">
                  <RetroTerminal title="error-terminal">
                    <p>{'>'} No data found</p>
                    <p>{'>'} Database empty</p>
                    <p className="animate-pulse">{'>'} Waiting..._</p>
                  </RetroTerminal>
                </div>
                <p className="text-amber-700 mb-6">
                  Be the first to share your retro computing story!
                </p>
                {isAuthenticated ? (
                  <Link to="/posts/create">
                    <Button variant="primary">CREATE FIRST POST</Button>
                  </Link>
                ) : (
                  <Link to="/auth/register">
                    <Button variant="primary">JOIN TO POST</Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post, index) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  index={index}
                  isLoaded={isLoaded}
                />
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <div className="text-center mt-12">
              <div className="bg-amber-100 p-6 border-4 border-amber-600 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-amber-800 mb-4">
                  Join the Conversation
                </h3>
                <p className="text-amber-700 mb-4">
                  Have a retro computing story to share? Join our community and
                  start writing today!
                </p>
                {isAuthenticated ? (
                  <Link to="/posts/create">
                    <Button variant="primary" className="px-8">
                      WRITE YOUR STORY
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/auth/register">
                      <Button variant="primary" className="px-6">
                        REGISTER
                      </Button>
                    </Link>
                    <Link to="/auth/login">
                      <Button variant="secondary" className="px-6">
                        LOGIN
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default BlogPage;
