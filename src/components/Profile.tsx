import { useLogoutMutation } from '@/api/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InitialAuthSlices } from '@/store/slice/authSlice';
import { RootState } from '@/store/store';
import { CiLogout } from 'react-icons/ci';
import { useSelector } from 'react-redux';

interface ProfileProps {
  isMobile: boolean;
}

const Profile = ({ isMobile }: ProfileProps) => {
  const [logout] = useLogoutMutation();
  const { user } = useSelector<RootState, InitialAuthSlices>((state) => state.user);
  const { name, email, photo } = user || {};

  return (
    <div
      style={isMobile ? { justifyContent: 'start' } : {}}
      className={isMobile ? 'flex flex-row-reverse gap-3' : 'flex items-center gap-3'}
    >
      <span className={isMobile ? 'flex flex-col items-start' : 'flex flex-col items-end'}>
        <span className=''>{name || 'Tushar Imran'}</span>
        <span className='text-xs'>{email || 'tusharimran@gmail.com'}</span>
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            src={photo || ''}
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
              <span
                onClick={() => {
                  logout({});
                  window.location.href = '/login';
                }}
              >
                Logout
              </span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
