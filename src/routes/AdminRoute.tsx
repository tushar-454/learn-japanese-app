import { useTokenQuery } from '@/api/authSlice';
import Loading from '@/components/shared/Loading';
import { useToast } from '@/hooks/use-toast';
import { storeUser } from '@/store/slice/authSlice';
import { AppDispatch } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { data: user, isLoading } = useTokenQuery({});

  useEffect(() => {
    if (!isLoading && user) {
      dispatch(storeUser(user?.data));
    }
    if (!isLoading && (!user || user?.data?.role !== 'admin')) {
      navigate('/');
      toast({
        title: 'Forbidden Access',
        description: 'You need to be an admin to access this page.',
      });
    }
  }, [dispatch, user, navigate, isLoading, toast]);

  if (isLoading) {
    return <Loading />;
  }

  return user ? children : null;
};

export default AdminRoute;
