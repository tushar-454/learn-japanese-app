import assets from '@/assets/assets';
import RegisterForm from '@/components/RegisterForm';
import { TypographyH4, TypographyP } from '@/components/ui/typography';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <main className='mt-20 flex justify-center bg-[#D8F8E7]/10'>
      {/* wrapper  */}
      <div className='w-[300px]'>
        {/* logo & title  */}
        <div className='flex flex-col items-center gap-4'>
          <Link to={'/'}>
            <img src={assets.logo} alt='logo' className='w-40 rounded-xl shadow-2xl' />
          </Link>
          <TypographyH4>Register Account</TypographyH4>
        </div>
        {/* form  */}
        <RegisterForm />
        {/* bottom section  */}
        <div className='flex flex-col items-center gap-1'>
          <TypographyP className='text-center'>
            You agree to{' '}
            <i>
              <b>Learn Japanese</b>
            </i>{' '}
            Privacy Policy and Terms of Service.
          </TypographyP>
          <TypographyP>
            <Link to={'/login'}>
              Already have an account?{' '}
              <span className='text-primary hover:underline hover:underline-offset-2'>Sign in</span>
            </Link>
          </TypographyP>
        </div>
      </div>
    </main>
  );
};

export default Register;
