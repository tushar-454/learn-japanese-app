import { TypographyH4, TypographyP } from './ui/typography';

export type TutorialType = {
  _id: string;
  description: string;
  title: string;
  video_url: string;
};

const TutorialCard = ({ tutorial }: { tutorial: TutorialType }) => {
  return (
    <div className='my-2 inline-block cursor-pointer rounded-md border bg-white p-4 shadow-lg transition-all hover:shadow-sm'>
      <iframe
        className='h-44 w-full md:h-56'
        src={`https://www.youtube.com/embed/${tutorial.video_url}?rel=0`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      ></iframe>
      <div className='mt-5 flex items-center justify-between'>
        <TypographyH4>{tutorial.title}</TypographyH4>
      </div>
      <TypographyP>{tutorial.description}</TypographyP>
    </div>
  );
};

export default TutorialCard;
