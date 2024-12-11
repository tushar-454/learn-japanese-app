import assets from '@/assets/assets';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountButtons from './AccountButtons';
import MobileNav from './MobileNav';
import Nav from './Nav';
import Profile from './Profile';
import Container from './shared/Container';
import { TypographyH4 } from './ui/typography';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const user = false;

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <header className='border-b-2 py-4'>
      <Container>
        {/* wrapper  */}
        <div className='flex items-center justify-between'>
          {/* logo  */}
          <div>
            <Link to={'/'} className='flex items-center gap-3'>
              <img src={assets.logo} alt='logo' width={80} className='rounded-lg shadow-2xl' />
              <TypographyH4 className='leading-6'>
                Learn Japanese <br /> Language
              </TypographyH4>
            </Link>
          </div>
          {/* desktop header content */}
          {!isMobile && user && (
            <>
              {/* nav  */}
              <Nav isMobile={false} />
            </>
          )}
          {!isMobile && (
            <>
              {/* account  */}
              {!user && <AccountButtons />}
              {user && <Profile isMobile={false} />}
            </>
          )}
          {/* mobile header content */}
          {isMobile && <MobileNav user={user} isMobile={isMobile} />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
