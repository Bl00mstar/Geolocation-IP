import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './Routes';
import MainLayout from '@layout/MainLayout/MainLayout';
import { AnimatePresence } from 'framer-motion';

import Background from './components/assets/Pattern-Randomized.svg';

const App = () => {
  const element = useRoutes(routes);
  return (
    <div
      style={{
        backgroundImage: `url("${Background}")`,
        height: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <MainLayout>
        <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
      </MainLayout>
    </div>
  );
};

export default App;

// background-image: url('${Background}');
// import Background from '../../assets/Subtle-Prism.svg';
