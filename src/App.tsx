import {Suspense, lazy} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const LoadingFallback = () => (
    <Layout>
      <p>Loading...</p>
    </Layout>
  );

  return (
    <BrowserRouter basename="/pp/">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <BlogPost />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
