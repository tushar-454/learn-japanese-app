import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import {
  MdOutlineDashboard,
  MdOutlineDriveFileRenameOutline,
  MdOutlineTimer,
} from 'react-icons/md';

import { TypographyH4, TypographyP } from '@/components/ui/typography';

export type LessonType = {
  _id: string;
  created_by: string;
  lesson_name: string;
  lesson_number: number;
  vocabulary: number;
};

const LessonCard = ({ lesson }: { lesson: LessonType }) => {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <TypographyH4>
          <span className='flex items-center gap-3'>
            <IoCheckmarkDoneOutline />
            {lesson.lesson_name}
          </span>
        </TypographyH4>
        <TypographyH4>
          <span className='flex items-center gap-3'>
            <MdOutlineDashboard />
            Total words - {lesson.vocabulary}
          </span>
        </TypographyH4>
        <TypographyP>
          <span className='flex items-center gap-3'>
            <MdOutlineDriveFileRenameOutline />
            Lesson - {lesson.lesson_number}
          </span>
        </TypographyP>
        <TypographyP>
          <span className='flex items-center gap-3'>
            <MdOutlineTimer />
            Duration - about {lesson.lesson_number * 1.5} minutes
          </span>
        </TypographyP>
      </div>
    </div>
  );
};

export default LessonCard;
