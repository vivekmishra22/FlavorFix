import React from 'react';

const Footer = () => {
  return (
    
    // The footer element is used to define the footer section of the page
    <footer className='footer'>  {/* Changed from div to footer for better semantic structure */}
    {/* Render the copyright text dynamically with the current year */}
      <p>&copy; {new Date().getFullYear()} Vivek - MERN Stack Developer</p>
    </footer>
    
  )
}

export default Footer;
