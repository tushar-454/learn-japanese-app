import { Toaster } from '@/components/ui/toaster';
import { RouterProvider } from 'react-router-dom';
import Routes from './routes/Routes';

function App() {
  return (
    <>
      <RouterProvider router={Routes}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
