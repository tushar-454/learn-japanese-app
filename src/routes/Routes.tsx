import { TypographyH1 } from '@/components/ui/typography';
import Root from '@/layouts/Root';
import Lessons from '@/pages/Lessons';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Tutorials from '@/pages/Tutorials';
import Vocabulary from '@/pages/Vocabulary';
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
        element: (
          <TypographyH1 className='mt-10 flex flex-col space-y-4 text-center'>
            <span>Welcome To Our App</span>
            <span>Learn Japanese Language</span>
          </TypographyH1>
        ),
      },
      {
        path: 'lessons',
        element: <Lessons />,
      },
      {
        path: 'lessons/:id',
        element: <Vocabulary />,
      },
      {
        path: 'tutorials',
        element: <Tutorials />,
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
