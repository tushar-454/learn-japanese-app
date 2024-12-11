import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CiLogout } from 'react-icons/ci';

interface ProfileProps {
  isMobile: boolean;
}

const Profile = ({ isMobile }: ProfileProps) => {
  return (
    <div
      style={isMobile ? { justifyContent: 'start' } : {}}
      className={isMobile ? 'flex flex-row-reverse gap-3' : 'flex items-center gap-3'}
    >
      <span className={isMobile ? 'flex flex-col items-start' : 'flex flex-col items-end'}>
        <span className=''>Tushar Imran</span>
        <span className='text-xs'>tusharimran@gmail.com</span>
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            src='https://scontent.fdac24-1.fna.fbcdn.net/v/t39.30808-6/456868441_3673011459677776_3519028296542460768_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=9bwmezEkJhQQ7kNvgF6oEh7&_nc_zt=23&_nc_ht=scontent.fdac24-1.fna&_nc_gid=ANQb_I_QFJD-bMNwlBjCeO6&oh=00_AYAvD7GZVFm5PCg905gAB8rkoNnUi7WEIkJKLRraP2YaFg&oe=675F4BA4'
            alt='profile'
            className='size-10 cursor-pointer rounded-full object-cover shadow-xl'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className='flex cursor-pointer items-center gap-2'>
              <CiLogout />
              <span>Logout</span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
