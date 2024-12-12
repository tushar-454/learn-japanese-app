import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useLessonsQuery, useUpdateLessonMutation } from '@/api/lessonSlice';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TypographyH3 } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateVocabularyMutation } from '@/api/vocabularySlice';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LessonType } from './AdminLessons';

const FormSchema = z.object({
  word: z.string({ message: 'Please enter a valid word' }),
  pronunciation: z.string({ message: 'Please enter a valid pronunciation' }),
  meaning: z.string({ message: 'Please enter a valid meaning' }),
  when_to_say: z.string({ message: 'Please enter a valid when to say' }),
});

const AdminAddVocabulary = () => {
  const { data, isLoading, isError, refetch } = useLessonsQuery({});
  const [updateLesson] = useUpdateLessonMutation();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const lessons = data?.data;
  const { toast } = useToast();
  const [createVocabulary] = useCreateVocabularyMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      word: '',
      pronunciation: '',
      meaning: '',
      when_to_say: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { word, pronunciation, meaning, when_to_say } = data;
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

    const res = await createVocabulary({
      word,
      pronunciation,
      meaning,
      when_to_say,
      lesson_no: lessons?.find((lesson: LessonType) => lesson._id === selectedId)?.lesson_number,
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
      const { data } = await updateLesson({
        id: selectedId,
        vocabulary:
          lessons?.find((lesson: LessonType) => lesson._id === selectedId)?.vocabulary + 1,
      });
      if (data.status === 200) refetch();
      toast({
        title: 'Vocabulary created.',
        description: 'You have successfully created a vocabulary.',
      });
      form.reset();
    }
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className='px-5 py-5 md:px-10'>
      <TypographyH3>Add Vocabulary</TypographyH3>

      {/* table here */}
      {isLoading && <Loading />}
      {isError && (
        <TypographyH3 className='mt-5 text-center text-red-500'>Error fetching users</TypographyH3>
      )}
      {lessons && lessons.length > 0 && (
        <div className='mt-5 w-[1024px] overflow-x-auto lg:w-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creator</TableHead>
                <TableHead>Lesson Name</TableHead>
                <TableHead>Lesson No</TableHead>
                <TableHead>Vocabulary</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons?.map((lesson: LessonType) => (
                <TableRow key={lessons._id}>
                  <TableCell>
                    <span className='flex items-center gap-2'>
                      <img
                        src={lesson.created_by.photo}
                        alt='photo'
                        className='size-14 rounded-full object-cover'
                      />
                      <span className='flex flex-col'>
                        <span className='font-semibold'>{lesson.created_by.name}</span>
                        <span>{lesson.created_by.email}</span>
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className='font-medium'>{lesson.lesson_name}</TableCell>
                  <TableCell>Lesson - {lesson.lesson_number}</TableCell>
                  <TableCell>Words - {lesson.vocabulary}</TableCell>
                  <TableCell>
                    {/* add vocabulary dialog  */}
                    <Dialog
                      open={open}
                      onOpenChange={() => {
                        setOpen(!open);
                      }}
                    >
                      <DialogTrigger>
                        <Button onClick={() => setSelectedId(lesson._id)}>Add Vocabulary</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className='mb-2'>Create Vocabulary</DialogTitle>
                          <DialogDescription>
                            {/* add form  */}
                            <div className='w-full'>
                              <Form {...form}>
                                <form
                                  onSubmit={form.handleSubmit(onSubmit)}
                                  className='my-8 w-full space-y-4'
                                >
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
                                  <Button type='submit' className='w-full'>
                                    Create
                                  </Button>
                                </form>
                              </Form>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminAddVocabulary;
