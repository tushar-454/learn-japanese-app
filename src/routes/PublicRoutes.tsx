import { useTokenQuery } from '@/api/authSlice';
import Loading from '@/components/shared/Loading';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useTokenQuery({});

  if (isLoading) {
    return <Loading />;
  }
  if (!isLoading && user) {
    navigate('/');
    return null;
  }
  return children;
};

export default PublicRoutes;
