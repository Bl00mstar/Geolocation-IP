import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './Routes';
import MainLayout from '@layout/MainLayout/MainLayout';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const element = useRoutes(routes);
  return (
    <>
      <MainLayout>
        <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
      </MainLayout>
    </>
  );
};

export default App;
