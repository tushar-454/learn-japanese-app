import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className='mx-auto max-w-screen-lg px-4 lg:px-0'>{children}</div>;
};

export default Container;
