import { uploadImage } from '@/lib/utils';
import { useState } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { FiUploadCloud } from 'react-icons/fi';
import { TypographySmall } from './ui/typography';

interface PhotoUploadProps {
  error: string;
  setPhoto: (name: string) => void;
  setError: (name: string) => void;
}

const PhotoUpload = ({ error, setError, setPhoto }: PhotoUploadProps) => {
  const [photoName, setPhotoName] = useState<string | ''>('');

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoName(e.target.files?.[0].name || '');
    const file = e.target.files?.[0];

    if (file) {
      setPhotoName(file.name + ' is uploading...');
      const res = await uploadImage(file);
      setPhotoName(file.name + ' uploaded');
      setError('');
      setPhoto(res);
    }
  };

  return (
    <>
      <label
        htmlFor='photo'
        className='flex h-20 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors hover:border-primary'
      >
        {photoName ? (
          <span className='flex items-center gap-3'>
            <CiImageOn className='size-6' />
            {photoName}
          </span>
        ) : (
          <span className='flex items-center gap-3'>
            <FiUploadCloud className='size-6' />
            Upload Photo
          </span>
        )}
      </label>
      <input
        type='file'
        name='photo'
        id='photo'
        accept='.png, .jpg, .jpeg, .webp'
        hidden
        onChange={handlePhotoUpload}
      />
      {error && <TypographySmall className='text-[13px] text-red-500'>{error}</TypographySmall>}
    </>
  );
};

export default PhotoUpload;
