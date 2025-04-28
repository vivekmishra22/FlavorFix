import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';   // Import NavLink for navigation with active link styling

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);  // State to control the visibility of the login/signup modal

  let token = localStorage.getItem("token");    // Fetch the token from localStorage to check if the user is logged in
  const [isLogin, setIsLogin] = useState(token ? false : true);   // Set initial state of login status based on the presence of a token
  let user = JSON.parse(localStorage.getItem("user"));    // Parse the user data stored in localStorage

  useEffect(() => {
    setIsLogin(token ? false : true); // Update the login state whenever the token value changes
  }, [token]);    // Dependency array ensures this effect runs when the `token` changes

  const checkLogin = () => {    // Function to handle login/logout behavior
    if (token) {    // If token exists, the user is logged in, so log them out
      localStorage.removeItem("token");   // Remove the token from localStorage
      localStorage.removeItem("user");    // Remove the user data from localStorage
      setIsLogin(true);   // Update the login state to show the "Login" button
    }
    else {
      setIsOpen(true);    // If token doesn't exist, open the login/signup modal
    }
  }

  return (
    <>

      <header>

        <h2>🍽️ FlavorFix</h2>

        <ul>

          {/* Navigation links */}
          <li>
            {/* NavLink to navigate to the homepage */} {/* Home link - always visible */}
            <NavLink to="/">Home</NavLink>
          </li>

          {/* My Recipes link - shows modal if not logged in */}
          <li onClick={() => isLogin && setIsOpen(true)}>
            {/* NavLink for "My Recipe" page, opens login modal if the user is not logged in */}
            {/* // Navigate to My Recipes if logged in, home if not  */}
            <NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink>  
          </li>

          {/* Favorites link - shows modal if not logged in */}
          <li onClick={() => isLogin && setIsOpen(true)}>
            {/* NavLink for "Favorites" page, opens login modal if the user is not logged in */}
            {/* //  Navigate to Favorites if logged in, home if not  */}
            <NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink>    
          </li>

          {/* Login/logout link */}
          <li onClick={checkLogin}>
            {/* If the user is logged in, show "Logout", else show "Login" */}  {/* Show "Login" or "Logout (email)" based on state */}
            <p className='Login'>
              {(isLogin) ? "Login" : "Logout "}
              {/* If user email exists, display it in parentheses */}
              {user?.email ? `( ${user?.email} )` : ""}
            </p>
          </li>

        </ul>

      </header>

      {/* Conditionally render the Modal and InputForm if isOpen is true */}  {/* Conditionally render Modal when isOpen is true */}
      {(isOpen) && <Modal onClose={() => setIsOpen(false)} >
        {/* Pass a function to close the modal when the modal's close button is clicked */}
        <InputForm setIsOpen={() => setIsOpen(false)} />
        {/* Pass a function to close the modal when the form is submitted */}
      </Modal>}
    </>
  )
}

export default Navbar;
