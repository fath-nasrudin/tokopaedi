import App from "./App.jsx";
import Layout from "./components/Layout";
import ErrorPage from './pages/ErrorPage';
import ProductDetail from "./pages/ProductDetail";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />
      },
    ]
  },

  
];

export default routes;