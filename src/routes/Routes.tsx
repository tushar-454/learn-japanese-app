import AdminLayout from '@/layouts/AdminLayout';
import Root from '@/layouts/Root';
import AdminAddLessons from '@/pages/AdminAddLessons';
import AdminAddTutorial from '@/pages/AdminAddTutorial';
import AdminAddVocabulary from '@/pages/AdminAddVocabulary';
import AdminLessons from '@/pages/AdminLessons';
import AdminTutorials from '@/pages/AdminTutorials';
import AdminVocabulary from '@/pages/AdminVocabulary';
import Home from '@/pages/Home';
import Lessons from '@/pages/Lessons';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Tutorials from '@/pages/Tutorials';
import Users from '@/pages/Users';
import Vocabulary from '@/pages/Vocabulary';
import { createBrowserRouter } from 'react-router-dom';
import AdminRoute from './AdminRoute';
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
        element: <Home />,
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
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Users />,
      },
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
      {
        path: 'vocabulary',
        element: <AdminVocabulary />,
      },
      {
        path: 'add-vocabulary',
        element: <AdminAddVocabulary />,
      },
      {
        path: 'tutorials',
        element: <AdminTutorials />,
      },
      {
        path: 'add-tutorial',
        element: <AdminAddTutorial />,
      },
    ],
  },
]);

export default Routes;
