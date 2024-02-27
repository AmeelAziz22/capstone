import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';

import './styles.css'

import Portfolio from './routes/portfolio-page';
import Main from './routes/main-page';
import ErrorPage from './error-page';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    errorElement: <ErrorPage />
  },
  {
    path: '/portfolio',
    element: <Portfolio/>,
    errorElement: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);