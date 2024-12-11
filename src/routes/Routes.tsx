import Root from '@/layouts/Root';
import Login from '@/pages/Login';
import { createBrowserRouter } from 'react-router-dom';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
]);

export default Routes;
