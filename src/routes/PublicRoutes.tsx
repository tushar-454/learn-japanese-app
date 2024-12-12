import { RootState } from '@/store/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const user = useSelector<RootState>((state) => state.user.user);
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  return children;
};

export default PublicRoutes;
