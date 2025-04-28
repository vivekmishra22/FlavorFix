import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';  // Import Outlet to render the matched child route
import Footer from './Footer';

const MainNavigation = () => {
  return (
    <>
      <Navbar/>   {/* Render the Navbar at the top of the page */}
      // This is where the content for the current route (like Home, Recipe Details, etc.) will be rendered.
      <Outlet />   {/* Render the matched child route (where the specific content will go) */}
      <Footer />    {/* Render the Footer at the bottom of the page */}
    </> 
  )
}

export default MainNavigation;    // Make MainNavigation available to be used in other files
