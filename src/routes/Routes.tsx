import Root from '@/layouts/Root';
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
]);

export default Routes;
