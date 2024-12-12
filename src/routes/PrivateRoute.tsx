import { useTokenQuery } from '@/api/authSlice';
import { useToast } from '@/hooks/use-toast';
import { storeUser } from '@/store/slice/authSlice';
import { AppDispatch } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { data: user, isLoading } = useTokenQuery({});

  useEffect(() => {
    if (!isLoading && user) {
      dispatch(storeUser(user?.data));
    }
    if (!isLoading && !user) {
      navigate('/login');
      toast({
        title: 'Unauthorized',
        description: 'You need to login to access this page.',
      });
    }
  }, [dispatch, user, navigate, isLoading, toast]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return user ? children : null;
};

export default PrivateRoute;
