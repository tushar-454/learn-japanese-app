import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// give me upload image function I upload image to imagebb
export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.data.success) {
      return response.data.data.display_url;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to upload image');
    }
  }
};
