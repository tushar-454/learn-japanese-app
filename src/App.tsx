import { Toaster } from '@/components/ui/toaster';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Routes from './routes/Routes';
import store from './store/store';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Provider store={store}>
        <RouterProvider router={Routes}></RouterProvider>
      </Provider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
