import { pronounceWord } from '@/lib/utils';
import { AiFillSound } from 'react-icons/ai';
import { TypographyH2, TypographyH3, TypographyH4, TypographyP } from './ui/typography';

export type VocabularyType = {
  _id: string;
  lesson_no: number;
  meaning: string;
  pronunciation: string;
  when_to_say: string;
  word: string;
};

const VocabularyCard = ({ vocabulary }: { vocabulary: VocabularyType }) => {
  return (
    <div className='my-10 flex flex-col items-center space-y-4'>
      <TypographyH2>
        <span className='flex flex-wrap items-center justify-center gap-5'>
          Word - {vocabulary.word}{' '}
          <AiFillSound
            onClick={() => pronounceWord(vocabulary.word)}
            className='cursor-pointer text-primary'
          />
        </span>
      </TypographyH2>
      <TypographyH4>Meaning - {vocabulary.meaning}</TypographyH4>
      <TypographyP>Pronunciation - {vocabulary.pronunciation}</TypographyP>
      <TypographyH3 className='text-center'>When to say - {vocabulary.when_to_say}</TypographyH3>
    </div>
  );
};

export default VocabularyCard;
