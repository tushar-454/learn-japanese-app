import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const user = null;
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  return children;
};

export default PublicRoutes;
