import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <main>
      <Header />
      <div className='flex h-screen flex-col justify-between'>
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};

export default Root;
