import { useTutorialsQuery } from '@/api/tutorialSlice';
import Container from '@/components/shared/Container';
import Loading from '@/components/shared/Loading';
import TutorialCard, { TutorialType } from '@/components/TutorialCard';
import { TypographyH2, TypographyH3 } from '@/components/ui/typography';

const Tutorials = () => {
  const { data, isLoading, isError } = useTutorialsQuery({});
  const tutorials = data?.data;

  return (
    <div>
      <Container>
        {isLoading && <Loading />}
        {isError && (
          <TypographyH3 className='mt-5 text-center text-red-500'>
            Error fetching tutorials
          </TypographyH3>
        )}
        {tutorials && (
          <>
            <TypographyH2>Our Tutorials</TypographyH2>
            {/* wrapper */}
            <div className='my-5 grid grid-cols-1 gap-5 sm:grid-cols-2'>
              {tutorials?.map((tutorial: TutorialType) => (
                <TutorialCard key={tutorial._id} tutorial={tutorial} />
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Tutorials;
