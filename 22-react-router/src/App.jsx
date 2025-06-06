import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Layout from './pages/Layout/Layout';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailsPage />,
      }
    ],
  },

]);

function App() {
  return <>
    <RouterProvider router={router} />
  </>
}

export default App;
