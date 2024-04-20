import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from "pages/dashboard/Dashboard";
import LeftNav from 'components/leftNav/LeftNav';

const PrivateLayout = () => {

  const [pageDimension, setPageDimension] = useState('');
  const isNavOpen = true;
  useEffect(() => {
    if (isNavOpen) {
      setPageDimension(
        'left-0  w-100 z-70 bg-gray/[06] sm:left-80  sm:w-[calc(100%-20rem)]'
      );
    } else {
      setPageDimension('left-0  w-full sm:left-[5rem] sm:w-[calc(100%-5rem)]');
    }
  }, [isNavOpen]);
  return (
    <div
      className={`flex z-[100] 
            flex-col w-full selection:bg-primaryColor/20 sm:flex-row`}>
      <LeftNav />
      <div
        id="main-section"
        className={`relative ${pageDimension} transition-all duration-[725ms] ease-out overflow-auto 
                customNormalScroll
                `}
        style={{
          height: '100vh'
        }}>
        {/* <div className='flex w-full h-full'> */}
        <Routes>
          <Route path='/home' element={<Dashboard />} />
          <Route
            path='/'
            element={<Navigate replace to='/home' />}
          />
          <Route
            path='*'
            element={<Navigate replace to='/home' />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default PrivateLayout;
