import { useToast } from '@/hooks/use-toast';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = null;
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  if (!user) {
    toast({
      title: 'You are not logged in',
      description: 'Please login to access the page',
      variant: 'destructive',
    });
    return;
  }
  return children;
};

export default PrivateRoute;
