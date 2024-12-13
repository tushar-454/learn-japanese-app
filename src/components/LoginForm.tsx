import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLoginMutation } from '@/api/authSlice';
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
import { storeUser } from '@/store/slice/authSlice';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';

const FormSchema = z.object({
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

const LoginForm = () => {
  const { toast } = useToast();
  const [login] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password } = data;
    const res = await login({ email, password });

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
    if (res.data.status === 200) {
      toast({
        title: 'Login successful.',
        description: 'Welcome back. ' + res.data.data.name,
      });
      dispatch(storeUser(res.data.data));
      window.location.href = '/';
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-8 w-full space-y-4'>
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
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
