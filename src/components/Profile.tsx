import { useLogoutMutation } from '@/api/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { InitialAuthSlices } from '@/store/slice/authSlice';
import { RootState } from '@/store/store';
import { Sun } from 'lucide-react';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';

interface ProfileProps {
  isMobile: boolean;
}

const Profile = ({ isMobile }: ProfileProps) => {
  const { toast } = useToast();
  const [logout] = useLogoutMutation();
  const { user } = useSelector<RootState, InitialAuthSlices>((state) => state.user);
  const { name, email, photo, role } = user || {};

  return (
    <>
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            style={isMobile ? { justifyContent: 'start' } : {}}
            className={isMobile ? 'flex flex-row-reverse gap-3' : 'flex items-center gap-3'}
          >
            <span className={isMobile ? 'flex flex-col items-start' : 'flex flex-col items-end'}>
              <span className=''>{name || 'Tushar Imran'}</span>
              <span className='text-xs'>{email || 'tusharimran@gmail.com'}</span>
            </span>
            <img
              src={photo || ''}
              alt='profile'
              className='size-10 cursor-pointer rounded-full object-cover shadow-xl'
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {role === 'admin' && (
            <DropdownMenuItem>
              <span className='flex cursor-pointer items-center gap-2'>
                <MdOutlineSpaceDashboard />
                <Link to={'/dashboard'}>Dashboard</Link>
              </span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <span className='flex cursor-pointer items-center gap-2'>
              <Sun size={16} />
              <span>Dark Mode</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className='flex cursor-pointer items-center gap-2'>
              <CiLogout />
              <span
                onClick={async () => {
                  const res = await logout({});
                  if (res.data.status === 200) {
                    toast({
                      title: 'Logout',
                      description: 'You have successfully logged out',
                    });
                    window.location.href = '/login';
                  }
                }}
              >
                Logout
              </span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Profile;
