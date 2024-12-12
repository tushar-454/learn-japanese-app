import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateLessonMutation } from '@/api/lessonSlice';
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
  lesson_name: z.string({ message: 'Lesson name is required' }),
  lesson_number: z.string({ message: 'Lesson number is required' }),
});

const AdminAddLessons = () => {
  const { toast } = useToast();
  const [createLesson] = useCreateLessonMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lesson_name: '',
      lesson_number: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { lesson_name, lesson_number } = data;
    const res = await createLesson({ lesson_name, lesson_number: +lesson_number });

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
        title: 'Lesson created.',
        description: 'You have successfully created a lesson.',
      });
      form.reset();
    }
  }

  return (
    <div className='px-5 py-5 md:px-10'>
      <TypographyH3>Add Lessons</TypographyH3>
      {/* add form  */}
      <div className='w-full sm:w-[640px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='my-8 w-full space-y-4'>
            <FormField
              control={form.control}
              name='lesson_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Name</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='lesson name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lesson_number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Number</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='4' {...field} />
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

export default AdminAddLessons;
