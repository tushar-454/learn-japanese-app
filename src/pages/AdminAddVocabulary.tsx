import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateVocabularyMutation } from '@/api/vocabularySlice';
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
  word: z.string({ message: 'Please enter a valid word' }),
  pronunciation: z.string({ message: 'Please enter a valid pronunciation' }),
  meaning: z.string({ message: 'Please enter a valid meaning' }),
  when_to_say: z.string({ message: 'Please enter a valid when to say' }),
  lesson_no: z.string({ message: 'Please enter a valid lesson number' }),
});

const AdminAddVocabulary = () => {
  const { toast } = useToast();
  const [createVocabulary] = useCreateVocabularyMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      word: '',
      pronunciation: '',
      meaning: '',
      when_to_say: '',
      lesson_no: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { word, pronunciation, meaning, when_to_say, lesson_no } = data;
    if (word === '') {
      toast({
        title: 'Word is required',
        description: 'Please enter a valid word.',
        variant: 'destructive',
      });
      return;
    }
    if (pronunciation === '') {
      toast({
        title: 'Pronunciation is required',
        description: 'Please enter a valid pronunciation.',
        variant: 'destructive',
      });
      return;
    }
    if (meaning === '') {
      toast({
        title: 'Meaning is required',
        description: 'Please enter a valid meaning.',
        variant: 'destructive',
      });
      return;
    }
    if (when_to_say === '') {
      toast({
        title: 'When to say is required',
        description: 'Please enter a valid when to say.',
        variant: 'destructive',
      });
      return;
    }
    if (lesson_no === '' || isNaN(+lesson_no) || +lesson_no === 0) {
      toast({
        title: 'Lesson number is required',
        description: 'Please enter a valid lesson number.',
        variant: 'destructive',
      });
      return;
    }
    const res = await createVocabulary({
      word,
      pronunciation,
      meaning,
      when_to_say,
      lesson_no: +lesson_no,
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
        title: 'Vocabulary created.',
        description: 'You have successfully created a vocabulary.',
      });
      form.reset();
    }
  }

  return (
    <div className='px-5 py-5 md:px-10'>
      <TypographyH3>Add Vocabulary</TypographyH3>
      {/* add form  */}
      <div className='w-full sm:w-[640px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='my-8 w-full space-y-4'>
            <FormField
              control={form.control}
              name='word'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Word</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='こんにちは' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='pronunciation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronunciation</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='konnichiwa' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='meaning'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meaning</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='hello' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='when_to_say'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When to say</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='greeting' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lesson_no'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Number</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='5' {...field} />
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

export default AdminAddVocabulary;
