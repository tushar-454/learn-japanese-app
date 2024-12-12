import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <main>
      <Header />
      <div className='h-screen'>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Root;
