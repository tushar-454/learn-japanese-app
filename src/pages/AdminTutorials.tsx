import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  useDeleteTutorialsMutation,
  useTutorialsQuery,
  useUpdateTutorialsMutation,
} from '@/api/tutorialSlice';
import Loading from '@/components/shared/Loading';
import { TutorialType } from '@/components/TutorialCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypographyH3, TypographyH4, TypographyP } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

const initialTutorial: TutorialType = {
  _id: '',
  description: '',
  title: '',
  video_url: '',
};

const AdminTutorials = () => {
  const { data, isLoading, isError, refetch } = useTutorialsQuery({});
  const [deleteTutorial] = useDeleteTutorialsMutation();
  const [updateTutorialData] = useUpdateTutorialsMutation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [updateTutorial, setUpdateTutoraial] = useState<TutorialType>(initialTutorial);

  const tutorials = data?.data;

  const handleDeleteTutorial = async (id: string) => {
    const { data } = await deleteTutorial(id);
    if (data.status === 200) {
      toast({
        title: 'Tutorial deleted successfully',
      });
      setOpen(false);
      refetch();
    }
  };

  const handleUpdateTutorial = async (id: string) => {
    const { title, description, video_url } = updateTutorial;

    if (!title || !description || !video_url) {
      toast({
        title: 'All fields are required',
        description: `${!title ? 'Title,' : ''} ${!description ? 'Description,' : ''} ${
          !video_url ? 'Youtube Video ID,' : ''
        }  are required`,
        variant: 'destructive',
      });
      return;
    }

    const { data } = await updateTutorialData({
      id,
      title,
      description,
      video_url,
    });
    if (data.status === 200) {
      toast({
        title: 'Tutorial Update successfully',
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
      <TypographyH3>All Tutorials</TypographyH3>
      {/* table here */}
      {isLoading && <Loading />}
      {isError && (
        <TypographyH3 className='mt-5 text-center text-red-500'>
          Error fetching tutorials
        </TypographyH3>
      )}
      {tutorials && tutorials.length > 0 && (
        <div className='my-5 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
          {tutorials?.map((tutorial: TutorialType) => (
            <div className='my-2 flex cursor-pointer flex-col rounded-md border bg-white p-4 shadow-lg transition-all hover:shadow-sm'>
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
              <span className='mt-5 flex flex-grow items-end justify-between gap-2'>
                {/* update dialog  */}
                <Dialog
                  open={openUpdate}
                  onOpenChange={() => {
                    setOpenUpdate(!openUpdate);
                  }}
                >
                  <DialogTrigger>
                    <Button
                      variant={'secondary'}
                      onClick={() => {
                        setSelectedId(tutorial._id);
                        setUpdateTutoraial(tutorial);
                      }}
                    >
                      Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className='mb-2'>Edit</DialogTitle>
                      <DialogDescription>
                        <Label htmlFor='title'>Title</Label>
                        <Input
                          type='text'
                          id='title'
                          name='title'
                          value={updateTutorial?.title}
                          onChange={(e) =>
                            setUpdateTutoraial({
                              ...updateTutorial,
                              title: e.target.value,
                            })
                          }
                        />
                        <span className='my-5 block'></span>
                        <Label htmlFor='description'>Description</Label>
                        <Input
                          type='text'
                          id='description'
                          name='description'
                          value={updateTutorial?.description}
                          onChange={(e) =>
                            setUpdateTutoraial({
                              ...updateTutorial,
                              description: e.target.value,
                            })
                          }
                        />
                        <span className='my-5 block'></span>
                        <Label htmlFor='video_url'>Video ID</Label>
                        <Input
                          type='text'
                          id='video_url'
                          name='video_url'
                          value={updateTutorial?.video_url}
                          onChange={(e) =>
                            setUpdateTutoraial({
                              ...updateTutorial,
                              video_url: e.target.value,
                            })
                          }
                        />
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      variant={'destructive'}
                      onClick={() => handleUpdateTutorial(selectedId)}
                    >
                      Update
                    </Button>
                  </DialogContent>
                </Dialog>
                {/* delete dialog  */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger>
                    <Button variant={'destructive'} onClick={() => setSelectedId(tutorial._id)}>
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      variant={'destructive'}
                      onClick={() => handleDeleteTutorial(selectedId)}
                    >
                      Yes, delete
                    </Button>
                  </DialogContent>
                </Dialog>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTutorials;
