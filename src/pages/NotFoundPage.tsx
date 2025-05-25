import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blinkCursor, setBlinkCursor] = useState(true);

  useEffect(() => {
    // Simulate "loading" for retro effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setBlinkCursor((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 font-mono">
      <div
        className={`w-full max-w-2xl bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-500 ${
          isLoaded
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-8'
        }`}
      >
        <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 text-center font-bold border-b-4 border-amber-700">
          <h1 className="text-2xl tracking-wider">ERROR 404</h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-amber-100 border-l-4 border-amber-500 p-4">
            <p className="font-bold text-amber-800 mb-2">System Error:</p>
            <p className="text-amber-700 font-mono">
              &gt; The page you are looking for does not exist
              {blinkCursor ? '_' : ' '}
            </p>
            <p className="text-amber-700 font-mono mt-2">
              &gt; Error code: PAGE_NOT_FOUND
            </p>
          </div>

          <div className="bg-amber-100 border-l-4 border-amber-500 p-4">
            <p className="font-bold text-amber-800 mb-2">Suggested Actions:</p>
            <ul className="list-disc list-inside text-amber-700 space-y-1">
              <li>Check the URL for typing errors</li>
              <li>Return to the homepage</li>
              <li>Contact system administrator</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/" className="flex-1">
              <Button>RETURN HOME</Button>
            </Link>
            <Link to="/blog" className="flex-1">
              <Button variant="secondary">GO TO BLOG</Button>
            </Link>
          </div>
        </div>

        <div className="bg-amber-100 p-3 border-t-4 border-amber-700 text-center text-amber-800 text-sm">
          <p>RETRO BLOG SYSTEM © {new Date().getFullYear()}</p>
          <p className="text-xs mt-1">
            Memory available: 640K (Should be enough for anybody)
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
