import assets from '@/assets/assets';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlMenu } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import AccountButtons from './AccountButtons';
import Nav from './Nav';
import Profile from './Profile';
import { TypographyH4 } from './ui/typography';
// import { Button } from './ui/button';

interface MobileNavProps {
  user: boolean;
  isMobile: boolean;
}

const MobileNav = ({ user, isMobile }: MobileNavProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <SlMenu className='size-8' />
        {/* <Button variant={'default'}>Menu</Button> */}
      </SheetTrigger>
      <SheetContent>
        {/* wrapper  */}
        <div className='flex flex-col space-y-8'>
          {/* logo  */}
          <div>
            <Link to={'/'} className='flex items-center gap-3'>
              <img src={assets.logo} alt='logo' width={80} className='rounded-lg shadow-2xl' />
              <TypographyH4 className='leading-6'>
                Learn Japanese <br /> Language
              </TypographyH4>
            </Link>
          </div>

          {/* nav  */}
          {user && <Nav isMobile={isMobile} />}

          {/* account  */}
          {!user && <AccountButtons />}
          {user && <Profile isMobile={isMobile} />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
