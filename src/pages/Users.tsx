import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useDeleteUserMutation, useUpdateUserMutation, useUsersQuery } from '@/api/userSlice';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useState } from 'react';

type UserType = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
};

const Users = () => {
  const { data: user, isLoading, isError, refetch } = useUsersQuery({});
  const users = user?.data;
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleDeleteUser = async (id: string) => {
    const { data } = await deleteUser(id);
    if (data.status === 200) {
      toast({
        title: 'User deleted successfully',
      });
      setOpen(false);
      refetch();
    }
  };

  const handleUpdateUser = async (role: string, id: string) => {
    const { data } = await updateUser({ id, role });
    if (data.status === 200) {
      toast({
        title: 'User Update successfully',
      });
      refetch();
    }
  };

  return (
    <div className='px-5 py-5 md:px-10'>
      <TypographyH3>All Users</TypographyH3>
      {/* table here */}
      {isLoading && <Loading />}
      {isError && (
        <TypographyH3 className='mt-5 text-center text-red-500'>Error fetching users</TypographyH3>
      )}
      {user && users.length > 0 && (
        <div className='mt-5 w-[1024px] overflow-x-auto lg:w-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user: UserType) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <img
                      src={user.photo}
                      alt='photo'
                      className='size-10 rounded-full object-cover'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className='text-end'>
                    <Select onValueChange={(e) => handleUpdateUser(e, user._id)}>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder={user.role.toLocaleUpperCase()} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='admin'>ADMIN</SelectItem>
                        <SelectItem value='user'>USER</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <span className='flex items-center gap-2'>
                      {/* <Button variant={'secondary'}>Update</Button> */}
                      {/* delete dialog  */}
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                          <Button variant={'destructive'}>Delete</Button>
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
                            onClick={() => handleDeleteUser(user._id)}
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

export default Users;
