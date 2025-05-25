import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ControlPostsPage from './pages/ControlPostsPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/auth/:mod" element={<AuthPage />} />
        <Route path="/posts/:id" element={<ControlPostsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
