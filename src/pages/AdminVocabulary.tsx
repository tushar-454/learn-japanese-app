import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useLessonsQuery, useUpdateLessonMutation } from '@/api/lessonSlice';
import {
  useAdminVocabularyQuery,
  useDeleteVocabularyMutation,
  useUpdateVocabularyMutation,
} from '@/api/vocabularySlice';
import { LessonType } from '@/components/LessonCard';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { pronounceWord } from '@/lib/utils';
import { useEffect, useState } from 'react';
type VocabularyType = {
  _id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  when_to_say: string;
  lesson_no: number;
  created_by: {
    _id: string;
    name: string;
    email: string;
    photo: string;
  };
};

const initialVocabulary: VocabularyType = {
  _id: '',
  word: '',
  pronunciation: '',
  meaning: '',
  when_to_say: '',
  lesson_no: 0,
  created_by: {
    _id: '',
    name: '',
    email: '',
    photo: '',
  },
};

const AdminVocabulary = () => {
  const { data, isLoading, isError, refetch } = useAdminVocabularyQuery({});
  const [deleteVocabulary] = useDeleteVocabularyMutation();
  const [updateVocabularyData] = useUpdateVocabularyMutation();
  const [updateLesson] = useUpdateLessonMutation();
  const { data: lessonData, refetch: lessonRefetch } = useLessonsQuery({});
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [updateVocabulary, setUpdateVocabulary] = useState<VocabularyType>(initialVocabulary);

  const vocabulary = data?.data;
  const lessons = lessonData?.data;

  const handleDeleteVocabulary = async (id: string) => {
    const { data } = await deleteVocabulary(id);
    if (data.status === 200) {
      toast({
        title: 'Vocabulary deleted successfully',
      });
      setOpen(false);
      refetch();
      const lessonNo = vocabulary?.find((item: VocabularyType) => item._id === id)?.lesson_no;
      const lessonId = lessons?.find((item: LessonType) => item.lesson_number === lessonNo)?._id;
      const { data } = await updateLesson({
        id: lessonId,
        vocabulary: +(
          lessons?.find((item: LessonType) => item.lesson_number === lessonNo)?.vocabulary - 1
        ),
      });
      if (data.status === 200) {
        refetch();
        lessonRefetch();
      }
    }
  };

  const handleUpdateVocabulary = async (id: string) => {
    const { word, pronunciation, meaning, when_to_say, lesson_no } = updateVocabulary;

    if (!word || !pronunciation || !meaning || !when_to_say || !lesson_no) {
      toast({
        title: 'All fields are required',
        description: `${!word ? 'Word,' : ''} ${!pronunciation ? 'Pronunciation,' : ''} ${
          !meaning ? 'Meaning,' : ''
        } ${!when_to_say ? 'When to say,' : ''} ${!lesson_no ? 'Lesson No,' : ''} are required`,
        variant: 'destructive',
      });
      return;
    }

    const { data } = await updateVocabularyData({
      id,
      word,
      pronunciation,
      meaning,
      when_to_say,
      lesson_no,
    });
    if (data.status === 200) {
      toast({
        title: 'Vocabulary Update successfully',
      });
      setOpenUpdate(false);
      refetch();
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className='px-5 py-5 md:px-10'>
      <TypographyH3>All Vocabulary</TypographyH3>
      {/* table here */}
      {isLoading && <Loading />}
      {isError && (
        <TypographyH3 className='mt-5 text-center text-red-500'>Error fetching users</TypographyH3>
      )}
      {vocabulary && vocabulary.length > 0 && (
        <div className='mt-5 w-[1024px] overflow-x-auto lg:w-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lesson Number</TableHead>
                <TableHead>Word</TableHead>
                <TableHead>Pronunciation</TableHead>
                <TableHead>Meaning</TableHead>
                <TableHead>When to say</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vocabulary?.map((item: VocabularyType) => (
                <TableRow key={item._id}>
                  <TableCell>Lesson - {item.lesson_no}</TableCell>
                  <TableCell
                    className='cursor-pointer font-medium'
                    onClick={() => pronounceWord(item.word)}
                  >
                    {item.word}
                  </TableCell>
                  <TableCell>{item.pronunciation}</TableCell>
                  <TableCell>{item.meaning}</TableCell>
                  <TableCell>{item.when_to_say}</TableCell>
                  <TableCell className='text-end'>
                    <span className='flex items-center gap-2'>
                      {/* update dialog  */}
                      <Dialog
                        open={openUpdate}
                        onOpenChange={() => {
                          setOpenUpdate(!openUpdate);
                          setUpdateVocabulary(item);
                        }}
                      >
                        <DialogTrigger>
                          <Button variant={'secondary'} onClick={() => setSelectedId(item._id)}>
                            Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className='mb-2'>Edit</DialogTitle>
                            <DialogDescription>
                              <Label htmlFor='lesson_no'>Lesson No</Label>
                              <Input
                                type='text'
                                id='lesson_no'
                                name='lesson_no'
                                value={updateVocabulary?.lesson_no}
                                onChange={(e) =>
                                  setUpdateVocabulary({
                                    ...updateVocabulary,
                                    lesson_no: +e.target.value,
                                  })
                                }
                              />
                              <span className='my-5 block'></span>
                              <Label htmlFor='word'>Word</Label>
                              <Input
                                type='text'
                                id='word'
                                name='word'
                                value={updateVocabulary?.word}
                                onChange={(e) =>
                                  setUpdateVocabulary({
                                    ...updateVocabulary,
                                    word: e.target.value,
                                  })
                                }
                              />
                              <span className='my-5 block'></span>
                              <Label htmlFor='pronunciation'>Pronunciation</Label>
                              <Input
                                type='text'
                                id='pronunciation'
                                name='pronunciation'
                                value={updateVocabulary?.pronunciation}
                                onChange={(e) =>
                                  setUpdateVocabulary({
                                    ...updateVocabulary,
                                    pronunciation: e.target.value,
                                  })
                                }
                              />
                              <span className='my-5 block'></span>
                              <Label htmlFor='meaning'>Meaning</Label>
                              <Input
                                type='text'
                                id='meaning'
                                name='meaning'
                                value={updateVocabulary?.meaning}
                                onChange={(e) =>
                                  setUpdateVocabulary({
                                    ...updateVocabulary,
                                    meaning: e.target.value,
                                  })
                                }
                              />
                              <span className='my-5 block'></span>
                              <Label htmlFor='when_to_say'>When to say</Label>
                              <Input
                                type='text'
                                id='when_to_say'
                                name='when_to_say'
                                value={updateVocabulary?.when_to_say}
                                onChange={(e) =>
                                  setUpdateVocabulary({
                                    ...updateVocabulary,
                                    when_to_say: e.target.value,
                                  })
                                }
                              />
                            </DialogDescription>
                          </DialogHeader>
                          <Button
                            variant={'destructive'}
                            onClick={() => handleUpdateVocabulary(selectedId)}
                          >
                            Update
                          </Button>
                        </DialogContent>
                      </Dialog>
                      {/* delete dialog  */}
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                          <Button variant={'destructive'} onClick={() => setSelectedId(item._id)}>
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete data from
                              our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <Button
                            variant={'destructive'}
                            onClick={() => handleDeleteVocabulary(selectedId)}
                          >
                            Yes, delete
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </span>
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

export default AdminVocabulary;
