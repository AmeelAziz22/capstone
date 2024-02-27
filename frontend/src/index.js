import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';

import './styles.css';

import Main from './routes/main-page';
import Login from './routes/login';
import Register from './routes/register';
import Explore from './routes/explore';
import Portfolio from './routes/portfolio-page';
import ErrorPage from './error-page';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login/>,
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: <Register/>,
    errorElement: <ErrorPage />
  },
  {
    path: '/explore',
    element: <Explore/>,
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