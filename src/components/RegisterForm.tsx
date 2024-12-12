import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRegisterMutation } from '@/api/authSlice';
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
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoUpload from './PhotoUpload';

const FormSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
  email: z
    .string()
    .email({
      message: 'Invalid email address.',
    })
    .regex(/gmail\.com$/, {
      message: 'Only gmail.com email addresses are allowed.',
    }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const RegisterForm = () => {
  const [photo, setPhoto] = useState<string | ''>('');
  const [error, setError] = useState<string | ''>('');
  const { toast } = useToast();
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!photo || photo === '') {
      setError('Please upload a photo');
      return;
    }

    const { name, email, password } = data;
    const res = await register({ name, email, password, photo });
    if (res.error) {
      console.log('error');
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
        title: 'Account created.',
        description: 'We have created your account. Login now.',
      });
      navigate('/login');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-8 w-full space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Ali Abdaal' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='text' placeholder='example@yahoo.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PhotoUpload setPhoto={setPhoto} error={error} setError={setError} />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='4@#989@#$@' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Create Account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
