import LoginPage from 'pages/login/LoginPage';
import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

const PublicLayout = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route
        path='*'
        element={
          <Navigate
            to='/login'
            state={{ from: location.pathname }}
            replace
          />
        }
      />
    </Routes>
  );
};

export default PublicLayout;
