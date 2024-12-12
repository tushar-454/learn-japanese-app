import Root from '@/layouts/Root';
import Lessons from '@/pages/Lessons';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoutes from './PublicRoutes';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <h1>Home</h1>,
      },
      {
        path: 'lessons',
        element: <Lessons />,
      },
      {
        path: 'tutorials',
        element: <h1>Home</h1>,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <PublicRoutes>
        <Login />,
      </PublicRoutes>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoutes>
        <Register />,
      </PublicRoutes>
    ),
  },
]);

export default Routes;
