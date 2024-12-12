import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { TypographyH2 } from './ui/typography';

const Footer = () => {
  return (
    <footer className='relative mx-auto mt-20 w-full bg-secondary-foreground text-center text-white xl:mt-32'>
      <div className='px-6 py-8 md:py-14 xl:pb-12 xl:pt-20'>
        <TypographyH2 className='text-3xl font-bold leading-snug xl:text-4xl'>
          "Start your journey to learning Japanese today <br /> no cost, no limits."
        </TypographyH2>
        <Link to={'/lessons'}>
          <Button variant={'outline'} className='mt-10 inline-block text-black'>
            Get started
          </Button>
        </Link>
        <div className='mt-14 xl:mt-20'>
          <nav className='flex flex-wrap justify-center text-lg font-medium'>
            <div className='px-5 py-2'>
              <a href='#'>About Us</a>
            </div>
            <div className='px-5 py-2'>
              <a href='#'>Features or Services</a>
            </div>
            <div className='px-5 py-2'>
              <a href='#'>Support</a>
            </div>
            <div className='px-5 py-2'>
              <a href='#'>Terms</a>
            </div>
            <div className='px-5 py-2'>
              <a href='#'>Social Media</a>
            </div>
          </nav>
          <p className='mt-7 text-base'>© 2024 Learn Japanese</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
