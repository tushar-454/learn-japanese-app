import { Toaster } from '@/components/ui/toaster';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Routes from './routes/Routes';
import store from './store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={Routes}></RouterProvider>
      </Provider>
      <Toaster />
    </>
  );
}

export default App;
