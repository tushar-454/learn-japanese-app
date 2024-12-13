import { useVocabularyQuery } from '@/api/vocabularySlice';
import Confetti from '@/components/Confetti';
import Container from '@/components/shared/Container';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { TypographyH2, TypographyH3 } from '@/components/ui/typography';
import VocabularyCard, { VocabularyType } from '@/components/VocabularyCard';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Vocabulary = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const { data, isLoading, isError } = useVocabularyQuery({
    query: `lesson_no=${id}&page=${page}&limit=1`,
  });
  const vocabulary = data?.data;
  return (
    <div>
      <Container>
        {isLoading && <Loading />}
        {isError && (
          <TypographyH3 className='mt-5 text-center text-red-500'>
            Error fetching vocabulary
          </TypographyH3>
        )}
        {vocabulary && (
          <>
            <TypographyH2>
              Lessons {id} - Vocabulary - {page}
            </TypographyH2>
            {/* wrapper */}
            <div className='my-5'>
              {vocabulary?.map((vocabulary: VocabularyType) => (
                <VocabularyCard key={vocabulary._id} vocabulary={vocabulary} />
              ))}
            </div>
          </>
        )}
        <div className='flex items-center justify-center gap-32'>
          <Button
            disabled={data?.links.prev ? false : true}
            onClick={() => {
              setPage((prev) => prev - 1);
              setShowConfetti(false);
            }}
          >
            Prev
          </Button>
          <Button
            disabled={data?.links.next ? false : true}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
        {!data?.links.next && (
          <div className='mt-8 flex items-center justify-center gap-32'>
            <Button variant={'outline'} onClick={() => setShowConfetti(true)}>
              Completed Lesson
            </Button>
          </div>
        )}
      </Container>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default Vocabulary;
