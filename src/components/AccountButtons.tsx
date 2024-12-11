import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const AccountButtons = () => {
  return (
    <div className='flex items-center gap-3'>
      <Link to={'/login'}>
        <Button variant={'default'}>Login</Button>
      </Link>
      <Link to={'/register'}>
        <Button variant={'outline'}>Register</Button>
      </Link>
    </div>
  );
};

export default AccountButtons;
