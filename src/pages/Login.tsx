import assets from '@/assets/assets';
import LoginForm from '@/components/LoginForm';
import { TypographyH4, TypographyP } from '@/components/ui/typography';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <main className='flex h-screen items-center justify-center bg-[#D8F8E7]/10'>
      {/* wrapper  */}
      <div className='w-[300px]'>
        {/* logo & title  */}
        <div className='flex flex-col items-center gap-4'>
          <Link to={'/'}>
            <img src={assets.logo} alt='logo' className='w-40 rounded-xl shadow-2xl' />
          </Link>
          <TypographyH4>Login Now</TypographyH4>
        </div>
        {/* form  */}
        <LoginForm />
        {/* bottom section  */}
        <div className='flex flex-col items-center gap-1'>
          <TypographyP>Forget your PIN? Reset your PIN.</TypographyP>
          <TypographyP>
            <Link to={'/register'}>
              Don&apos;t have an account?{' '}
              <span className='text-primary hover:underline hover:underline-offset-2'>Sign Up</span>
            </Link>
          </TypographyP>
        </div>
      </div>
    </main>
  );
};

export default Login;
