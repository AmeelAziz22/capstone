import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>We apologize for the inconvenience.</p>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
};

export default ErrorPage;
