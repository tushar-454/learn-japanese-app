import { useLessonsQuery } from '@/api/lessonSlice';
import LessonCard, { LessonType } from '@/components/LessonCard';
import Container from '@/components/shared/Container';
import Loading from '@/components/shared/Loading';
import { TypographyH2, TypographyH3 } from '@/components/ui/typography';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Lessons = () => {
  const { data, isLoading, isError } = useLessonsQuery({});
  const lessons = data?.data;
  useEffect(() => {
    document.title = 'All Lessons';
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Container>
        {isLoading && <Loading />}
        {isError && (
          <TypographyH3 className='mt-5 text-center text-red-500'>
            Error fetching lessons
          </TypographyH3>
        )}
        {lessons && (
          <>
            <TypographyH2>All Lessons</TypographyH2>
            {/* wrapper */}
            <div className='my-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
              {lessons?.map((lesson: LessonType) => (
                <Link
                  to={`/lessons/${lesson.lesson_number}`}
                  key={lesson._id}
                  className='my-2 inline-block cursor-pointer rounded-md border bg-white p-4 shadow-lg transition-all hover:shadow-sm'
                >
                  <LessonCard lesson={lesson} />
                </Link>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Lessons;
