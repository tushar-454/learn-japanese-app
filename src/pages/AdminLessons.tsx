import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  useDeleteLessonMutation,
  useLessonsQuery,
  useUpdateLessonMutation,
} from '@/api/lessonSlice';
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
import { useEffect, useState } from 'react';
type LessonType = {
  _id: string;
  lesson_name: string;
  lesson_number: number;
  vocabulary: number;
  created_by: {
    _id: string;
    name: string;
    email: string;
    photo: string;
  };
};
const AdminLessons = () => {
  const { data, isLoading, isError, refetch } = useLessonsQuery({});
  const [deleteLesson] = useDeleteLessonMutation();
  const [updateLesson] = useUpdateLessonMutation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [lessonName, setLessonName] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const lessons = data?.data;

  const handleDeleteLesson = async (id: string) => {
    const { data } = await deleteLesson(id);
    if (data.status === 200) {
      toast({
        title: 'Lesson deleted successfully',
      });
      setOpen(false);
      refetch();
    }
  };

  const handleUpdateLesson = async (id: string) => {
    if (!lessonName || !lessonNumber) {
      toast({
        title: 'Lesson Name and Lesson Number is required',
      });
      return;
    }
    if (isNaN(Number(lessonNumber))) {
      toast({
        title: 'Lesson Number must be a number',
      });
      return;
    }
    const { data } = await updateLesson({
      id,
      lesson_number: +lessonNumber,
      lesson_name: lessonName,
    });
    if (data?.status === 200) {
      toast({
        title: 'User Update successfully',
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
      <TypographyH3>All Lessons</TypographyH3>
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
                  <TableCell className='text-end'>
                    <span className='flex items-center gap-2'>
                      {/* delete dialog  */}
                      <Dialog
                        open={openUpdate}
                        onOpenChange={() => {
                          setOpenUpdate(!openUpdate);
                          setLessonName(lesson.lesson_name);
                          setLessonNumber(lesson.lesson_number.toString());
                        }}
                      >
                        <DialogTrigger>
                          <Button variant={'secondary'} onClick={() => setSelectedId(lesson._id)}>
                            Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className='mb-2'>Edit</DialogTitle>
                            <DialogDescription>
                              <Label htmlFor='lesson_name'>Lesson Name</Label>
                              <Input
                                type='text'
                                id='lesson_name'
                                name='lesson_name'
                                value={lessonName}
                                onChange={(e) => setLessonName(e.target.value)}
                              />
                              <span className='my-5 block'>
                                <Label htmlFor='lesson_number'>Lesson Number</Label>
                                <Input
                                  type='text'
                                  id='lesson_number'
                                  name='lesson_number'
                                  value={lessonNumber}
                                  onChange={(e) => setLessonNumber(e.target.value)}
                                />
                              </span>
                            </DialogDescription>
                          </DialogHeader>
                          <Button
                            variant={'destructive'}
                            onClick={() => handleUpdateLesson(selectedId)}
                          >
                            Update
                          </Button>
                        </DialogContent>
                      </Dialog>
                      {/* delete dialog  */}
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                          <Button variant={'destructive'} onClick={() => setSelectedId(lesson._id)}>
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
                            onClick={() => handleDeleteLesson(selectedId)}
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

export default AdminLessons;
