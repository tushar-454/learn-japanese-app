import Root from '@/layouts/Root';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

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
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default Routes;
