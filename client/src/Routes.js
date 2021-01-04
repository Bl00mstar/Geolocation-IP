import React from 'react';

import Home from '@views/Home';
import About from '@views/About';

export const routes = [
  {
    description: 'Home',
    path: '/',
    element: <Home />,
    type: 'routing',
  },
  {
    description: 'About',
    path: '/about',
    element: <About />,
    type: 'routing',
  },
];
