import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateTutorialsMutation } from '@/api/tutorialSlice';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TypographyH3 } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  title: z.string({ message: 'Please enter a valid title' }),
  description: z.string({ message: 'Please enter a valid description' }),
  video_url: z.string({ message: 'Please enter a valid video ID' }),
});

const AdminAddTutorial = () => {
  const { toast } = useToast();
  const [createTutorial] = useCreateTutorialsMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      video_url: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { title, description, video_url } = data;

    const res = await createTutorial({
      title,
      description,
      video_url,
    });

    if (res.error) {
      const errorMessage =
        'data' in res.error &&
        typeof res.error.data === 'object' &&
        res.error.data !== null &&
        'error' in res.error.data
          ? (res.error.data as { error: string }).error
          : 'An error occurred';
      toast({
        title: errorMessage,
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
    if (res.data.status === 201) {
      toast({
        title: 'Tutorial created.',
        description: 'You have successfully created a Tutorial.',
      });
      form.reset();
    }
  }

  return (
    <div className='px-5 py-5 md:px-10'>
      <TypographyH3>Add Tutorial</TypographyH3>
      {/* add form  */}
      <div className='w-full sm:w-[640px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='my-8 w-full space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='daily uses words ...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='video short description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='video_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video ID</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='ePu05w5aIBE' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminAddTutorial;
