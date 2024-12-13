import { TypographyH1 } from '@/components/ui/typography';

const Home = () => {
  return (
    <div>
      <TypographyH1 className='mt-10 flex flex-col space-y-4 text-center'>
        <span>Welcome To Our App</span>
        <span className='inline-block bg-gradient-to-b from-primary-foreground to-primary bg-clip-text text-transparent'>
          Learn Japanese Language
        </span>
      </TypographyH1>
    </div>
  );
};

export default Home;
