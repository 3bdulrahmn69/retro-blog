import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ControlPostsPage from './pages/ControlPostsPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext ';
import retroTheme from './theme/retroTheme';

function App() {
  return (
    <ThemeProvider theme={retroTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/auth/:mod" element={<AuthPage />} />
            <Route path="/posts/create" element={<ControlPostsPage />} />
            <Route path="/posts/edit/:id" element={<ControlPostsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
