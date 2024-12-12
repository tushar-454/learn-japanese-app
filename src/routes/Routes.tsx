import { TypographyH1 } from '@/components/ui/typography';
import AdminLayout from '@/layouts/AdminLayout';
import Root from '@/layouts/Root';
import AdminAddLessons from '@/pages/AdminAddLessons';
import AdminLessons from '@/pages/AdminLessons';
import Lessons from '@/pages/Lessons';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Tutorials from '@/pages/Tutorials';
import Users from '@/pages/Users';
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
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'lessons',
        element: <AdminLessons />,
      },
      {
        path: 'add-lessons',
        element: <AdminAddLessons />,
      },
    ],
  },
]);

export default Routes;
